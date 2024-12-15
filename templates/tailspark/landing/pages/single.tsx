import type { Game } from "@/types/game";
import GameDetail from "@/templates/tailspark/landing/components/game";

export default function ({
  game,
  more_games,
}: {
  game: Game;
  more_games: Game[];
}) {
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {game && (
          <GameDetail game={game} more_games={more_games} />
        )}
      </div>
    </section>
  );
}
