import { findGameBySlug, getGamesWithTranslation } from "@/models/game";

import pagejson from "@/pagejson/en.json";
import type { Game } from "@/types/game";
import GameIframe from "@/templates/tailspark/landing/components/game/iframe";
import Games from "@/templates/tailspark/landing/components/games";
import Markdown from "@/components/markdown";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const game = await findGameBySlug(name, "en");

  return {
    title: `${game?.title || "-"} | ${pagejson?.metadata?.title}`,
    description: game?.meta_description || "-",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/game/${name}`,
    },
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const game = await findGameBySlug(name, "en");
  console.log('game', game);
  console.log('name', name);
  if (!game || !game.uuid) {
    return <div>Game not found</div>;
  }

  let games: Game[] = [];
  games = await getGamesWithTranslation(1, 100, "en");

  return (
    <div>
      <div className="w-full max-w-5xl mx-auto aspect-video">
        <GameIframe game={game} />
      </div>
      <Games games={games} />
      <div className="w-full md:max-w-7xl mx-auto px-8 py-4 mt-16 text-left border border-gray-200 rounded-lg">
        <article>
          {game.description && (
            <Markdown content={game.description || ""} />
          )}
        </article>
      </div>
    </div>
  );
}
