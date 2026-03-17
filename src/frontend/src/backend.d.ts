import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Player {
    id: Principal;
    username: string;
    hand: Array<Card>;
    wins: bigint;
    losses: bigint;
    totalGames: bigint;
}
export interface Card {
    rank: Variant_ace_six_ten_two_three_five_four_jack_king_nine_queen_eight_seven;
    suit: Variant_diamonds_clubs_spades_hearts;
}
export interface UserProfile {
    username: string;
    wins: bigint;
    losses: bigint;
    totalGames: bigint;
}
export interface GameRoom {
    status: RoomStatus;
    deck: Array<Card>;
    scores: Array<bigint>;
    currentTurn: bigint;
    players: Array<Player>;
    gameType: GameType;
    phase: GamePhase;
    roomId: bigint;
    maxPlayers: bigint;
}
export enum GamePhase {
    playing = "playing",
    finished = "finished",
    waiting = "waiting"
}
export enum GameType {
    santase = "santase",
    belot = "belot",
    spades = "spades",
    durak = "durak"
}
export enum RoomStatus {
    closed = "closed",
    open = "open",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_ace_six_ten_two_three_five_four_jack_king_nine_queen_eight_seven {
    ace = "ace",
    six = "six",
    ten = "ten",
    two = "two",
    three = "three",
    five = "five",
    four = "four",
    jack = "jack",
    king = "king",
    nine = "nine",
    queen = "queen",
    eight = "eight",
    seven = "seven"
}
export enum Variant_diamonds_clubs_spades_hearts {
    diamonds = "diamonds",
    clubs = "clubs",
    spades = "spades",
    hearts = "hearts"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createGameRoom(gameType: GameType, maxPlayers: bigint): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getRoomDetails(roomId: bigint): Promise<GameRoom>;
    getRoomListByPlayers(): Promise<Array<[bigint, GameRoom]>>;
    getRoomListByStatus(status: RoomStatus): Promise<Array<[bigint, GameRoom]>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    joinGameRoom(roomId: bigint, username: string): Promise<void>;
    leaveGameRoom(roomId: bigint): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
