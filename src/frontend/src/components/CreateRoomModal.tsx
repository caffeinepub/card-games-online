import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GameType, useCreateRoom, useJoinRoom } from "@/hooks/useQueries";
import { useCallerProfile } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const GAME_CONFIGS: Record<GameType, { label: string; players: number[] }> = {
  [GameType.belot]: { label: "Belot", players: [4] },
  [GameType.santase]: { label: "Santase", players: [2] },
  [GameType.durak]: { label: "Durak", players: [2, 3, 4, 5, 6] },
  [GameType.spades]: { label: "Spades", players: [4] },
};

interface CreateRoomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultGameType?: GameType;
}

export function CreateRoomModal({
  open,
  onOpenChange,
  defaultGameType = GameType.belot,
}: CreateRoomModalProps) {
  const [gameType, setGameType] = useState<GameType>(defaultGameType);
  const [maxPlayers, setMaxPlayers] = useState<string>(
    GAME_CONFIGS[defaultGameType].players[0].toString(),
  );
  const createRoom = useCreateRoom();
  const joinRoom = useJoinRoom();
  const { data: profile } = useCallerProfile();
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!profile?.username) {
      toast.error("Please sign in and set a username first");
      return;
    }
    try {
      const roomId = await createRoom.mutateAsync({
        gameType,
        maxPlayers: BigInt(Number.parseInt(maxPlayers)),
      });
      await joinRoom.mutateAsync({ roomId, username: profile.username });
      onOpenChange(false);
      navigate({ to: "/room/$id", params: { id: roomId.toString() } });
    } catch {
      toast.error("Failed to create room");
    }
  };

  const isPending = createRoom.isPending || joinRoom.isPending;
  const config = GAME_CONFIGS[gameType];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-ocid="create_room.dialog">
        <DialogHeader>
          <DialogTitle>Create Game Room</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Game Type</Label>
            <Select
              value={gameType}
              onValueChange={(v) => {
                setGameType(v as GameType);
                setMaxPlayers(
                  GAME_CONFIGS[v as GameType].players[0].toString(),
                );
              }}
            >
              <SelectTrigger data-ocid="create_room.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(GAME_CONFIGS).map(([key, cfg]) => (
                  <SelectItem key={key} value={key}>
                    {cfg.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Max Players</Label>
            <Select value={maxPlayers} onValueChange={setMaxPlayers}>
              <SelectTrigger data-ocid="create_room.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {config.players.map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n} players
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              data-ocid="create_room.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="flex-1 gold-gradient text-navy-900 font-bold border-0"
              onClick={handleCreate}
              disabled={isPending}
              data-ocid="create_room.submit_button"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                "Create Room"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
