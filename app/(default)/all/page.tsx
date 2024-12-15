import {
  getGamesWithKeyword,
  getGamesWithTranslation,
} from "@/models/game";

import type { Game } from "@/types/game";
import Games from "@/templates/tailspark/landing/components/games";

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


  return (
    <div>
      <Games games={games} />
    </div>
  );
}
