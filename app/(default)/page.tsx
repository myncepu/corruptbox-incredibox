import {
  getGamesCount,
  getGamesWithTranslation,
} from "@/models/game";

import LandingPage from "@/templates/tailspark/landing/pages/index";
import type { Game } from "@/types/game";
import pagejson from "@/pagejson/en.json";

export const runtime = "edge";

export default async function Home() {
  let games: Game[] = [];
  games = await getGamesWithTranslation(1, 100, "en");

  const gamesCount = await getGamesCount();

  return (
    <LandingPage
      page={pagejson}
      games={games}
      gamesCount={gamesCount}
    />
  );
}
