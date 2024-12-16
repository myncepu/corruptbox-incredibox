import { respData, respErr } from "@/utils/resp";

import { getGamesWithoutSummary } from "@/models/game";
import { summarizeGame } from "@/services/game";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { page, limit } = await req.json();

    const games = await getGamesWithoutSummary(page, limit);
    console.log("games", games);

    const summarizedGames = await Promise.all(
      games
        .filter((game) => game.uuid && game.slug)
        .map((game) => summarizeGame(game))
    );

    return respData(summarizedGames);
  } catch (e) {
    console.log("summarize games failed: ", e);
    return respErr("summarize games failed");
  }
}
