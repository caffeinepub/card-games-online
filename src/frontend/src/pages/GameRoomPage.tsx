import { CardBack, PlayingCard } from "@/components/PlayingCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeaveRoom, useRoomDetails } from "@/hooks/useQueries";
import { useCallerProfile } from "@/hooks/useQueries";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Clock, Loader2, LogOut, Trophy, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { GamePhase, GameType, type Player } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const GAME_TYPE_LABEL: Record<GameType, string> = {
  [GameType.belot]: "Belot",
  [GameType.santase]: "Santase",
  [GameType.durak]: "Durak",
  [GameType.spades]: "Spades",
};

const PHASE_LABEL: Record<GamePhase, string> = {
  [GamePhase.waiting]: "Waiting for Players",
  [GamePhase.playing]: "Game in Progress",
  [GamePhase.finished]: "Game Over",
};

const PHASE_COLOR: Record<GamePhase, string> = {
  [GamePhase.waiting]: "bg-gold-500/15 text-gold-600 border-gold-500/30",
  [GamePhase.playing]: "bg-success/15 text-success border-success/30",
  [GamePhase.finished]: "bg-muted text-muted-foreground",
};

export default function GameRoomPage() {
  const params = useParams({ from: "/room/$id" });
  const roomId = BigInt(params.id);
  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: profile } = useCallerProfile();
  const { data: room, isLoading } = useRoomDetails(roomId);
  const leaveRoom = useLeaveRoom();

  const handleLeave = async () => {
    try {
      await leaveRoom.mutateAsync(roomId);
      navigate({ to: "/" });
      toast.success("Left the room");
    } catch {
      toast.error("Failed to leave room");
    }
  };

  if (!identity) {
    return (
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center" data-ocid="room.error_state">
          <p className="text-xl font-bold mb-2">Not authenticated</p>
          <p className="text-muted-foreground mb-4">
            Please sign in to view game rooms
          </p>
          <Button onClick={() => navigate({ to: "/" })} data-ocid="room.button">
            Back to Lobby
          </Button>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex-1 p-8" data-ocid="room.loading_state">
        <div className="max-w-5xl mx-auto space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </main>
    );
  }

  if (!room) {
    return (
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center" data-ocid="room.error_state">
          <p className="text-xl font-bold mb-2">Room not found</p>
          <Button onClick={() => navigate({ to: "/" })} data-ocid="room.button">
            Back to Lobby
          </Button>
        </div>
      </main>
    );
  }

  const currentTurnPlayer = room.players[Number(room.currentTurn)] ?? null;
  const myPlayer =
    room.players.find((p) => p.username === profile?.username) ?? null;
  const otherPlayers = room.players.filter(
    (p) => p.username !== profile?.username,
  );

  return (
    <main className="flex-1 flex flex-col" data-ocid="room.section">
      {/* Room Header */}
      <div className="navy-bg text-white px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-xl">
                  {GAME_TYPE_LABEL[room.gameType]} Room
                </h1>
                <span className="text-white/50 font-mono text-sm">
                  #{room.roomId.toString()}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <Badge
                  variant="outline"
                  className={`text-xs ${PHASE_COLOR[room.phase]}`}
                >
                  {PHASE_LABEL[room.phase]}
                </Badge>
                <span className="text-white/60 text-sm flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  {room.players.length} / {room.maxPlayers.toString()} players
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/20 text-white bg-transparent hover:bg-red-500/20 hover:border-red-400 gap-2"
            onClick={handleLeave}
            disabled={leaveRoom.isPending}
            data-ocid="room.delete_button"
          >
            {leaveRoom.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            Leave Room
          </Button>
        </div>
      </div>

      {/* Game Table */}
      <div className="flex-1 felt-bg p-4 sm:p-8">
        <div className="max-w-5xl mx-auto">
          {room.phase === GamePhase.waiting ? (
            <WaitingState room={room} currentUser={profile?.username} />
          ) : room.phase === GamePhase.finished ? (
            <FinishedState room={room} />
          ) : (
            <PlayingState
              room={room}
              myPlayer={myPlayer}
              otherPlayers={otherPlayers}
              currentTurnPlayer={currentTurnPlayer}
            />
          )}
        </div>
      </div>
    </main>
  );
}

function WaitingState({
  room,
  currentUser,
}: {
  room: { players: Player[]; maxPlayers: bigint; gameType: GameType };
  currentUser?: string;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16"
      data-ocid="room.loading_state"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        className="text-6xl mb-6"
      >
        🂠
      </motion.div>
      <h2 className="text-white text-2xl font-bold mb-2">
        Waiting for Players
      </h2>
      <p className="text-white/60 mb-8">
        {room.players.length} of {room.maxPlayers.toString()} players joined
      </p>

      {/* Player Seats */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from({ length: Number(room.maxPlayers) }).map((_, seatIdx) => {
          const player = room.players[seatIdx];
          const seatKey = `seat-${seatIdx}`;
          return (
            <AnimatePresence key={seatKey}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`w-28 h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-1 ${
                  player
                    ? "bg-white/10 border-gold-500/50"
                    : "bg-white/5 border-white/10 border-dashed"
                }`}
                data-ocid={`room.item.${seatIdx + 1}`}
              >
                {player ? (
                  <>
                    <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                      <span className="text-navy-900 text-sm font-bold">
                        {player.username[0]?.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white text-xs font-medium truncate px-2 max-w-full">
                      {player.username}
                      {player.username === currentUser && " (you)"}
                    </span>
                  </>
                ) : (
                  <>
                    <Users className="w-5 h-5 text-white/20" />
                    <span className="text-white/30 text-xs">Empty Seat</span>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
}

function PlayingState({
  room,
  myPlayer,
  otherPlayers,
  currentTurnPlayer,
}: {
  room: { scores: bigint[]; currentTurn: bigint; players: Player[] };
  myPlayer: Player | null;
  otherPlayers: Player[];
  currentTurnPlayer: Player | null;
}) {
  return (
    <div className="space-y-6" data-ocid="room.panel">
      {/* Scores */}
      <div className="flex flex-wrap gap-4 justify-center">
        {room.players.map((player, i) => (
          <div
            key={player.username}
            className={`bg-white/10 rounded-xl px-4 py-3 text-center border ${
              currentTurnPlayer?.username === player.username
                ? "border-gold-500 shadow-gold"
                : "border-white/10"
            }`}
            data-ocid={`room.card.${i + 1}`}
          >
            <p className="text-white/60 text-xs uppercase tracking-wide mb-0.5">
              Player
            </p>
            <p className="text-white font-bold">{player.username}</p>
            {currentTurnPlayer?.username === player.username && (
              <Badge className="mt-1 bg-gold-500 text-navy-900 text-xs border-0">
                <Clock className="w-2.5 h-2.5 mr-1" />
                Your turn
              </Badge>
            )}
            {room.scores[i] !== undefined && (
              <p className="text-gold-400 text-sm font-bold mt-1">
                <Trophy className="w-3 h-3 inline mr-0.5" />
                {room.scores[i].toString()} pts
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Other players' hidden cards */}
      {otherPlayers.length > 0 && (
        <div className="space-y-4">
          {otherPlayers.map((player) => (
            <div key={player.username} className="text-center">
              <p className="text-white/50 text-sm mb-2">
                {player.username}'s hand ({player.hand.length} cards)
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                {player.hand.slice(0, 8).map((_, cardIdx) => (
                  <CardBack key={`${player.username}-back-${cardIdx}`} small />
                ))}
                {player.hand.length > 8 && (
                  <div className="w-10 h-14 flex items-center justify-center text-white/50 text-xs">
                    +{player.hand.length - 8}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Game area */}
      <div className="flex justify-center">
        <div className="w-40 h-24 rounded-2xl border-2 border-white/20 bg-white/5 flex items-center justify-center">
          <span className="text-white/30 text-sm">Playing area</span>
        </div>
      </div>

      {/* My hand */}
      {myPlayer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
          data-ocid="room.panel"
        >
          <p className="text-white/60 text-sm text-center mb-3">
            Your hand ({myPlayer.hand.length} cards)
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            {myPlayer.hand.map((card, handIdx) => (
              <motion.div
                key={`${card.rank}-${card.suit}-${handIdx}`}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="cursor-pointer"
                data-ocid={`room.item.${handIdx + 1}`}
              >
                <PlayingCard card={card} />
              </motion.div>
            ))}
          </div>
          {myPlayer.hand.length === 0 && (
            <p className="text-center text-white/40 text-sm">
              No cards in hand
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}

function FinishedState({
  room,
}: { room: { players: Player[]; scores: bigint[] } }) {
  const navigate = useNavigate();
  const maxScore = room.scores.reduce((a, b) => (b > a ? b : a), BigInt(0));
  const winnerIdx = room.scores.findIndex((s) => s === maxScore);
  const winner = room.players[winnerIdx];

  return (
    <div
      className="flex flex-col items-center justify-center py-16"
      data-ocid="room.success_state"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="text-7xl mb-6"
      >
        🏆
      </motion.div>
      <h2 className="text-white text-3xl font-bold mb-2">Game Over!</h2>
      {winner && (
        <p className="text-gold-400 text-xl font-semibold mb-6">
          {winner.username} wins!
        </p>
      )}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {room.players.map((player, i) => (
          <div
            key={player.username}
            className="bg-white/10 rounded-xl px-5 py-3 text-center border border-white/10"
            data-ocid={`room.card.${i + 1}`}
          >
            <p className="text-white font-bold">{player.username}</p>
            <p className="text-gold-400 font-bold text-lg">
              {room.scores[i]?.toString() ?? "0"} pts
            </p>
          </div>
        ))}
      </div>
      <Button
        className="gold-gradient text-navy-900 font-bold uppercase border-0 shadow-gold"
        onClick={() => navigate({ to: "/" })}
        data-ocid="room.primary_button"
      >
        Back to Lobby
      </Button>
    </div>
  );
}
