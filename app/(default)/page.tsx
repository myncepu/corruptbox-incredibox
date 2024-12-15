import {
  getFeaturedGames,
  getGamesCount,
  getGamesWithKeyword,
  getGamesWithTranslation,
} from "@/models/game";

import LandingPage from "@/templates/tailspark/landing/pages/index";
import type { Game } from "@/types/game";
import pagejson from "@/pagejson/en.json";

export const runtime = "edge";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { q } = await searchParams;
  let games: Game[] = [];

  if (q) {
    games = await getGamesWithKeyword(q as string, 1, 100);
  } else {
    games = await getGamesWithTranslation(1, 100, "en");
  }

  const gamesCount = await getGamesCount();

  return (
    <LandingPage
      page={pagejson}
      games={games}
      gamesCount={gamesCount}
    />
  );
}
