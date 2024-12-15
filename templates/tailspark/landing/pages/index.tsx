import Faq from "../components/faq";
import Hero from "../components/hero";
import type { Page } from "@/types/landing";
import type { Game } from "@/types/game";
import Games from "../components/games/index";
import Search from "../components/search";

export default function ({
  page,
  games,
  gamesCount,
}: {
  page: Page;
  games: Game[];
  gamesCount: number;
}) {
  return (
    <div>
      {page.hero && <Hero hero={page.hero} count={gamesCount} />}
      <Search />
      <Games games={games} />
      {page.faq && <Faq section={page.faq} />}
    </div>
  );
}
