import { findGameBySlug, getRandomGames } from "@/models/game";

import Single from "@/templates/tailspark/landing/pages/single";
import pagejson from "@/pagejson/en.json";

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
    description: game?.description || "-",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/server/${name}`,
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
  if (!game || !game.uuid) {
    return <div>Game not found</div>;
  }

  const more_games = await getRandomGames(1, 50);

  return <Single game={game} more_games={more_games} />;
}
