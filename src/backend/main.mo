import Principal "mo:core/Principal";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Text "mo:core/Text";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types
  public type UserProfile = {
    username : Text;
    wins : Nat;
    losses : Nat;
    totalGames : Nat;
  };

  public type GameType = {
    #belot;
    #santase;
    #durak;
    #spades;
  };

  public type GamePhase = {
    #waiting;
    #playing;
    #finished;
  };

  public type RoomStatus = {
    #open;
    #inProgress;
    #closed;
  };

  public type Card = {
    suit : {
      #hearts;
      #diamonds;
      #clubs;
      #spades;
    };
    rank : {
      #seven;
      #eight;
      #nine;
      #ten;
      #jack;
      #queen;
      #king;
      #ace;
      #two;
      #three;
      #four;
      #five;
      #six;
    };
  };

  public type Player = {
    id : Principal;
    username : Text;
    hand : [Card];
    wins : Nat;
    losses : Nat;
    totalGames : Nat;
  };

  public type GameRoom = {
    roomId : Nat;
    gameType : GameType;
    maxPlayers : Nat;
    players : [Player];
    deck : [Card];
    currentTurn : Nat;
    scores : [Nat];
    phase : GamePhase;
    status : RoomStatus;
  };

  module RoomEntry {
    public type RoomEntry = (Nat, GameRoom);

    public func compareByPlayers(a : RoomEntry, b : RoomEntry) : Order.Order {
      let (_, roomA) = a;
      let (_, roomB) = b;
      Nat.compare(roomA.players.size(), roomB.players.size());
    };
  };

  // State
  let rooms = Map.empty<Nat, GameRoom>();
  var nextRoomId = 1;
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Game Room Functions
  // Create Game Room - Only authenticated users can create rooms
  public shared ({ caller }) func createGameRoom(gameType : GameType, maxPlayers : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create game rooms");
    };

    let roomId = nextRoomId;
    let newRoom = {
      roomId;
      gameType;
      maxPlayers;
      players = [];
      deck = [];
      currentTurn = 0;
      scores = [];
      phase = #waiting;
      status = #open;
    };
    rooms.add(roomId, newRoom);
    nextRoomId += 1;
    roomId;
  };

  // Join Game Room - Only authenticated users can join rooms
  public shared ({ caller }) func joinGameRoom(roomId : Nat, username : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can join game rooms");
    };

    switch (rooms.get(roomId)) {
      case (null) {
        Runtime.trap("Room not found");
      };
      case (?room) {
        if (room.status != #open or room.players.size() >= room.maxPlayers) {
          Runtime.trap("Room is not open or full");
        };

        // Check if player is already in the room
        let alreadyInRoom = Array.fromIter(
          room.players.values().filter(func(p) { p.id == caller })
        ).size() > 0;

        if (alreadyInRoom) {
          Runtime.trap("You are already in this room");
        };

        // Get user profile stats or use defaults
        let userStats = switch (userProfiles.get(caller)) {
          case (?profile) {
            { wins = profile.wins; losses = profile.losses; totalGames = profile.totalGames };
          };
          case (null) {
            { wins = 0; losses = 0; totalGames = 0 };
          };
        };

        let newPlayer : Player = {
          id = caller;
          username;
          hand = [];
          wins = userStats.wins;
          losses = userStats.losses;
          totalGames = userStats.totalGames;
        };
        let updatedPlayers = room.players.concat([newPlayer]);
        let updatedRoom = {
          room with players = updatedPlayers
        };
        rooms.add(roomId, updatedRoom);
      };
    };
  };

  // Leave Game Room - Only authenticated users who are in the room can leave
  public shared ({ caller }) func leaveGameRoom(roomId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can leave game rooms");
    };

    switch (rooms.get(roomId)) {
      case (null) {
        Runtime.trap("Room not found");
      };
      case (?room) {
        // Verify caller is actually in the room
        let isInRoom = Array.fromIter(
          room.players.values().filter(func(p) { p.id == caller })
        ).size() > 0;

        if (not isInRoom) {
          Runtime.trap("You are not in this room");
        };

        let remainingPlayers = Array.fromIter(
          room.players.values().filter(func(p) { p.id != caller })
        );
        let updatedRoom = {
          room with players = remainingPlayers
        };
        rooms.add(roomId, updatedRoom);
      };
    };
  };

  // Get Room List (sorted by number of players) - Public query, accessible to all
  public query ({ caller }) func getRoomListByPlayers() : async [(Nat, GameRoom)] {
    rooms.toArray().sort(RoomEntry.compareByPlayers);
  };

  // Get Room List (filtered by status) - Public query, accessible to all
  public query ({ caller }) func getRoomListByStatus(status : RoomStatus) : async [(Nat, GameRoom)] {
    let filteredRooms = rooms.entries().filter(
      func((_, room)) {
        room.status == status;
      }
    );
    filteredRooms.toArray();
  };

  // Get Room Details - Public query, accessible to all
  public query ({ caller }) func getRoomDetails(roomId : Nat) : async GameRoom {
    switch (rooms.get(roomId)) {
      case (null) { Runtime.trap("Room not found") };
      case (?room) { room };
    };
  };
};
