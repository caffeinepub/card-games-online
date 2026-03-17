import type { Card } from "../backend";
import {
  Variant_ace_six_ten_two_three_five_four_jack_king_nine_queen_eight_seven as Rank,
  Variant_diamonds_clubs_spades_hearts as Suit,
} from "../backend";

const RANK_DISPLAY: Record<Rank, string> = {
  [Rank.ace]: "A",
  [Rank.two]: "2",
  [Rank.three]: "3",
  [Rank.four]: "4",
  [Rank.five]: "5",
  [Rank.six]: "6",
  [Rank.seven]: "7",
  [Rank.eight]: "8",
  [Rank.nine]: "9",
  [Rank.ten]: "10",
  [Rank.jack]: "J",
  [Rank.queen]: "Q",
  [Rank.king]: "K",
};

const SUIT_SYMBOL: Record<Suit, string> = {
  [Suit.hearts]: "♥",
  [Suit.diamonds]: "♦",
  [Suit.clubs]: "♣",
  [Suit.spades]: "♠",
};

const isRed = (suit: Suit) => suit === Suit.hearts || suit === Suit.diamonds;

interface PlayingCardProps {
  card: Card;
  small?: boolean;
}

export function PlayingCard({ card, small = false }: PlayingCardProps) {
  const red = isRed(card.suit);
  const rank = RANK_DISPLAY[card.rank];
  const suit = SUIT_SYMBOL[card.suit];
  const color = red ? "text-red-600" : "text-gray-900";

  if (small) {
    return (
      <div className="playing-card bg-white rounded border border-gray-200 flex flex-col items-center justify-center select-none w-10 h-14 text-xs">
        <span className={`font-bold leading-none ${color}`}>{rank}</span>
        <span className={`leading-none ${color}`}>{suit}</span>
      </div>
    );
  }

  return (
    <div className="playing-card bg-white rounded-lg border border-gray-200 flex flex-col p-1.5 select-none w-16 h-24 relative">
      <div className={`font-bold text-sm leading-none ${color}`}>{rank}</div>
      <div className={`text-xs leading-none ${color}`}>{suit}</div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-2xl ${color} opacity-20 font-bold`}>{suit}</span>
      </div>
      <div
        className={`absolute bottom-1 right-1.5 font-bold text-sm leading-none ${color} rotate-180`}
      >
        {rank}
      </div>
      <div
        className={`absolute bottom-0.5 right-1 text-xs leading-none ${color} rotate-180`}
      >
        {suit}
      </div>
    </div>
  );
}

export function CardBack({ small = false }: { small?: boolean }) {
  return (
    <div
      className={`playing-card bg-navy-800 rounded-lg border border-navy-600 flex items-center justify-center select-none ${
        small ? "w-10 h-14" : "w-16 h-24"
      }`}
    >
      <div className="w-3/4 h-4/5 border border-gold-500/50 rounded flex items-center justify-center">
        <span className="text-gold-500 text-lg">♠</span>
      </div>
    </div>
  );
}
