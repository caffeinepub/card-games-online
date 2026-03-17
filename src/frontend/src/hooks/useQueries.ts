import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GameType, RoomStatus, type UserProfile } from "../backend";
import { useActor } from "./useActor";

export function useCallerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useOpenRooms() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["openRooms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRoomListByStatus(RoomStatus.open);
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 5000,
  });
}

export function useTopRooms() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["topRooms"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRoomListByPlayers();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useRoomDetails(roomId: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["roomDetails", roomId?.toString()],
    queryFn: async () => {
      if (!actor || roomId === null) return null;
      return actor.getRoomDetails(roomId);
    },
    enabled: !!actor && !isFetching && roomId !== null,
    refetchInterval: 2000,
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("No actor");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}

export function useCreateRoom() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      gameType,
      maxPlayers,
    }: { gameType: GameType; maxPlayers: bigint }) => {
      if (!actor) throw new Error("No actor");
      return actor.createGameRoom(gameType, maxPlayers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["openRooms"] });
    },
  });
}

export function useJoinRoom() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      roomId,
      username,
    }: { roomId: bigint; username: string }) => {
      if (!actor) throw new Error("No actor");
      return actor.joinGameRoom(roomId, username);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["openRooms"] });
      queryClient.invalidateQueries({ queryKey: ["roomDetails"] });
    },
  });
}

export function useLeaveRoom() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (roomId: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.leaveGameRoom(roomId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["openRooms"] });
      queryClient.invalidateQueries({ queryKey: ["roomDetails"] });
    },
  });
}

export { GameType, RoomStatus };
