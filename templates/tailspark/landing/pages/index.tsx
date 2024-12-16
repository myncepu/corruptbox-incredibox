import Faq from "../components/faq";
import Hero from "../components/hero";
import type { Page } from "@/types/landing";
import type { Game } from "@/types/game";
import Games from "../components/games/index";
import GameIframe from "../components/game/iframe";
import Markdown from "@/components/markdown";

export default function ({
  page,
  games,
  gamesCount,
}: {
  page: Page;
  games: Game[];
  gamesCount: number;
}) {
  console.log(games[0].description);
  return (
    <div>
      <div className="w-full max-w-5xl mx-auto h-[500px]">
        <GameIframe game={games[0]} />
      </div>
      {page.hero && <Hero hero={page.hero} count={gamesCount} />}
      <Games games={games} />
      <div className="w-full md:max-w-7xl mx-auto px-8 py-4 mt-16 text-left border border-gray-200 rounded-lg">
        <article>
          {games.length > 0 && games[0].description && (
            <Markdown content={games[0].description || ""} />
          )}
        </article>
      </div>
      {page.faq && <Faq section={page.faq} />}
    </div>
  );
}
