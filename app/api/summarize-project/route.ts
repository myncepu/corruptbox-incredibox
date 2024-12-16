import { respData, respErr } from "@/utils/resp";

import { findGameBySlug } from "@/models/game";
import { summarizeGame } from "@/services/game";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();
    if (!slug) {
      return respErr("slug is required");
    }

    const game = await findGameBySlug(slug, "en");
    if (!game || !game.uuid) {
      return respErr("invalid game");
    }

    const summarizedGame = await summarizeGame(game);

    return respData(summarizedGame);
  } catch (e) {
    console.log("summarize game failed: ", e);
    return respErr("summarize game failed");
  }
}
