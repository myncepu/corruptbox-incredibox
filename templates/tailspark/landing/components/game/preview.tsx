import type { Game } from "@/types/game";

export default function ({ game }: { game: Game }) {
  return (
    <img
      src={game.thumbnail_url || ""}
      alt={game.title}
      className="rounded-md"
    />
  );
}
