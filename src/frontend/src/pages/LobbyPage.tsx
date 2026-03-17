import { AuthModal } from "@/components/AuthModal";
import { CreateRoomModal } from "@/components/CreateRoomModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GameType,
  RoomStatus,
  useJoinRoom,
  useOpenRooms,
  useTopRooms,
} from "@/hooks/useQueries";
import { useCallerProfile } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Plus, Trophy, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { GameRoom } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

const GAME_INFO = [
  {
    type: GameType.belot,
    name: "Belot",
    players: "4 Players",
    description:
      "The classic Balkan trick-taking game. Bid, trump, and out-score your opponents in this beloved Eastern European card game.",
    image: "/assets/generated/game-belot.dim_600x400.jpg",
    badge: "Most Popular",
  },
  {
    type: GameType.santase,
    name: "Santase",
    players: "2 Players",
    description:
      "The fast-paced two-player game of skill and strategy. Reach 66 points before your opponent in this Central European classic.",
    image: "/assets/generated/game-santase.dim_600x400.jpg",
    badge: "Quick Match",
  },
  {
    type: GameType.durak,
    name: "Durak",
    players: "2-6 Players",
    description:
      "Russia's most popular card game — be the last one holding cards and you're the 'fool'. Defend and attack with style.",
    image: "/assets/generated/game-durak.dim_600x400.jpg",
    badge: "Fan Favorite",
  },
  {
    type: GameType.spades,
    name: "Spades",
    players: "4 Players",
    description:
      "The American partnership trick-taking game. Bid accurately, play strategically, and dominate with spades as always-trump.",
    image: "/assets/generated/game-spades.dim_600x400.jpg",
    badge: "Team Play",
  },
];

const GAME_TYPE_LABEL: Record<GameType, string> = {
  [GameType.belot]: "Belot",
  [GameType.santase]: "Santase",
  [GameType.durak]: "Durak",
  [GameType.spades]: "Spades",
};

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  open: {
    label: "Open",
    className: "bg-success/15 text-success border-success/30",
  },
  inProgress: {
    label: "In Progress",
    className: "bg-gold-500/15 text-gold-600 border-gold-500/30",
  },
  closed: { label: "Closed", className: "bg-muted text-muted-foreground" },
};

const SKELETON_ROWS = ["a", "b", "c"];
const SKELETON_COLS = ["1", "2", "3", "4", "5"];

export default function LobbyPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [createGameType, setCreateGameType] = useState<GameType>(
    GameType.belot,
  );
  const [joiningId, setJoiningId] = useState<bigint | null>(null);

  const navigate = useNavigate();
  const { identity } = useInternetIdentity();
  const { data: profile } = useCallerProfile();
  const { data: openRooms, isLoading: roomsLoading } = useOpenRooms();
  const { data: topRooms } = useTopRooms();
  const joinRoom = useJoinRoom();

  const requireAuth = (cb: () => void) => {
    if (!identity || !profile?.username) {
      setAuthOpen(true);
      return;
    }
    cb();
  };

  const handleJoin = async (roomId: bigint) => {
    requireAuth(async () => {
      setJoiningId(roomId);
      try {
        await joinRoom.mutateAsync({ roomId, username: profile!.username });
        navigate({ to: "/room/$id", params: { id: roomId.toString() } });
      } catch {
        toast.error("Failed to join room");
      } finally {
        setJoiningId(null);
      }
    });
  };

  const handleCreate = (gameType: GameType) => {
    requireAuth(() => {
      setCreateGameType(gameType);
      setCreateOpen(true);
    });
  };

  // Top players derived from topRooms
  const topPlayers = (() => {
    const playerMap = new Map<
      string,
      { username: string; wins: bigint; totalGames: bigint }
    >();
    for (const [, room] of topRooms ?? []) {
      for (const p of room.players) {
        if (!playerMap.has(p.username)) {
          playerMap.set(p.username, {
            username: p.username,
            wins: p.wins,
            totalGames: p.totalGames,
          });
        }
      }
    }
    return [...playerMap.values()]
      .sort((a, b) => Number(b.wins - a.wins))
      .slice(0, 5);
  })();

  // Recent activity strings
  const activityItems: string[] =
    (openRooms ?? []).length === 0
      ? ["No recent activity"]
      : (openRooms ?? [])
          .slice(0, 3)
          .map(
            ([roomId, room]: [bigint, GameRoom]) =>
              `Room #${roomId} \u2014 ${GAME_TYPE_LABEL[room.gameType]} (${room.players.length} players)`,
          );

  return (
    <main className="flex-1">
      {/* Hero */}
      <section
        className="relative min-h-[520px] flex items-center justify-center overflow-hidden"
        aria-label="Hero"
        data-ocid="hero.section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-banner.dim_1400x700.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/70 to-navy-900/90" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="font-display font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl uppercase leading-tight tracking-wide"
          >
            Experience the Thrill of Classic Card Games!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-white/75 mt-5 text-lg max-w-xl mx-auto"
          >
            Play Belot, Santase, Durak, Spades and more — with friends or
            strangers — right in your browser.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="gold-gradient text-navy-900 font-bold uppercase tracking-wider text-base border-0 shadow-gold px-8"
              onClick={() =>
                document
                  .getElementById("lobby")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              data-ocid="hero.primary_button"
            >
              Explore the Lobby
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-transparent hover:bg-white/10 uppercase tracking-wider text-base"
              onClick={() => setAuthOpen(true)}
              data-ocid="hero.secondary_button"
            >
              Create Account
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Popular Games */}
      <section
        id="games"
        className="py-16 px-4 max-w-7xl mx-auto"
        data-ocid="games.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-wide text-foreground">
              Popular Games
            </h2>
            <p className="text-muted-foreground mt-2">
              Choose your game and start playing
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAME_INFO.map((game, i) => (
              <motion.div
                key={game.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden flex flex-col"
                data-ocid={`games.item.${i + 1}`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={game.image}
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-gold-500 text-navy-900 font-bold text-xs border-0">
                      {game.badge}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-lg text-foreground">
                      {game.name}
                    </h3>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {game.players}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
                    {game.description}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      className="flex-1 gold-gradient text-navy-900 font-bold uppercase text-xs border-0"
                      onClick={() =>
                        document
                          .getElementById("lobby")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      data-ocid={`games.primary_button.${i + 1}`}
                    >
                      Join
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/20 text-primary font-bold uppercase text-xs hover:bg-primary hover:text-primary-foreground"
                      onClick={() => handleCreate(game.type)}
                      data-ocid={`games.secondary_button.${i + 1}`}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Create
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Lobby + Rankings */}
      <section
        id="lobby"
        className="py-16 px-4 bg-muted"
        data-ocid="lobby.section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-wide text-foreground">
                Active Lobby
              </h2>
              <p className="text-muted-foreground mt-1">
                Join an open room and start playing immediately
              </p>
            </div>
            <Button
              className="gold-gradient text-navy-900 font-bold uppercase border-0 shadow-gold gap-2"
              onClick={() => handleCreate(GameType.belot)}
              data-ocid="lobby.primary_button"
            >
              <Plus className="w-4 h-4" />
              Create Room
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Room Table */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                      <TableHead className="font-bold uppercase text-xs tracking-wide">
                        Room ID
                      </TableHead>
                      <TableHead className="font-bold uppercase text-xs tracking-wide">
                        Game
                      </TableHead>
                      <TableHead className="font-bold uppercase text-xs tracking-wide">
                        Players
                      </TableHead>
                      <TableHead className="font-bold uppercase text-xs tracking-wide">
                        Status
                      </TableHead>
                      <TableHead className="font-bold uppercase text-xs tracking-wide text-right">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {roomsLoading ? (
                      SKELETON_ROWS.map((rowKey) => (
                        <TableRow key={rowKey}>
                          {SKELETON_COLS.map((colKey) => (
                            <TableCell key={colKey}>
                              <Skeleton className="h-4 w-full" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (openRooms ?? []).length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-12 text-muted-foreground"
                          data-ocid="lobby.empty_state"
                        >
                          <div className="flex flex-col items-center gap-3">
                            <span className="text-4xl">🂠</span>
                            <p className="font-medium">No open rooms yet</p>
                            <p className="text-sm">
                              Be the first to create a game!
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      (openRooms ?? []).map(
                        ([roomId, room]: [bigint, GameRoom], idx: number) => {
                          const statusInfo =
                            STATUS_BADGE[room.status] ?? STATUS_BADGE.open;
                          const isJoining = joiningId === roomId;
                          return (
                            <TableRow
                              key={roomId.toString()}
                              className="hover:bg-muted/30 transition-colors"
                              data-ocid={`lobby.row.${idx + 1}`}
                            >
                              <TableCell className="font-mono text-sm font-bold text-muted-foreground">
                                #{roomId.toString()}
                              </TableCell>
                              <TableCell>
                                <span className="font-medium">
                                  {GAME_TYPE_LABEL[room.gameType]}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className="flex items-center gap-1 text-sm">
                                  <Users className="w-3.5 h-3.5 text-muted-foreground" />
                                  {room.players.length} /{" "}
                                  {room.maxPlayers.toString()}
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant="outline"
                                  className={`text-xs font-medium ${statusInfo.className}`}
                                >
                                  {statusInfo.label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  size="sm"
                                  className="gold-gradient text-navy-900 font-bold uppercase text-xs border-0"
                                  onClick={() => handleJoin(roomId)}
                                  disabled={
                                    isJoining || room.status !== RoomStatus.open
                                  }
                                  data-ocid={`lobby.button.${idx + 1}`}
                                >
                                  {isJoining ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    "JOIN"
                                  )}
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        },
                      )
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Rankings Sidebar */}
            <div id="rankings" className="space-y-4">
              <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border bg-primary">
                  <h3 className="font-bold text-white uppercase text-sm tracking-wide flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-gold-400" />
                    Player Rankings
                  </h3>
                </div>
                <div className="divide-y divide-border">
                  {topPlayers.length === 0 ? (
                    <div
                      className="p-6 text-center text-muted-foreground text-sm"
                      data-ocid="rankings.empty_state"
                    >
                      No players yet
                    </div>
                  ) : (
                    topPlayers.map((player, i) => (
                      <div
                        key={player.username}
                        className="flex items-center gap-3 px-5 py-3"
                        data-ocid={`rankings.item.${i + 1}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            i === 0
                              ? "bg-gold-500 text-navy-900"
                              : i === 1
                                ? "bg-gray-300 text-gray-700"
                                : i === 2
                                  ? "bg-amber-600 text-white"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {player.username}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {player.totalGames.toString()} games
                          </p>
                        </div>
                        <span className="text-sm font-bold text-gold-600">
                          {player.wins.toString()} W
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border bg-primary">
                  <h3 className="font-bold text-white uppercase text-sm tracking-wide flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gold-400" />
                    Recent Activity
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  {activityItems.map((item, i) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-sm"
                      data-ocid={`activity.item.${i + 1}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section
        id="how-to-play"
        className="py-16 px-4 max-w-7xl mx-auto"
        data-ocid="howtoplay.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold uppercase tracking-wide">
            How to Play
          </h2>
          <p className="text-muted-foreground mt-2">
            Get started in 3 simple steps
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Create an Account",
              desc: "Register with a username using Internet Identity — secure, no passwords needed.",
            },
            {
              step: "02",
              title: "Join or Create a Room",
              desc: "Browse open rooms in the lobby or create your own with your favorite game type.",
            },
            {
              step: "03",
              title: "Play & Win",
              desc: "Wait for players to fill the room, then enjoy the game! Track your wins on the leaderboard.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
              data-ocid={`howtoplay.item.${i + 1}`}
            >
              <div className="w-14 h-14 gold-gradient rounded-full flex items-center justify-center mb-4 shadow-gold">
                <span className="font-display font-bold text-navy-900 text-lg">
                  {item.step}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <CreateRoomModal
        open={createOpen}
        onOpenChange={setCreateOpen}
        defaultGameType={createGameType}
      />
    </main>
  );
}
