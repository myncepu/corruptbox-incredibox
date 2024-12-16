import { parseGame } from "@/services/game";
import { respData, respErr } from "@/utils/resp";

import type { Game } from "@/types/game";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const games: Game[] = await req.json();

    const parsedGames = games.map((g) => parseGame(g));
    if (!parsedGames) {
      return respErr("invalid game");
    }

    const savedGames = await Promise.all(
      parsedGames
        .filter((g): g is Game => g !== undefined)
        // .map(saveGame)
    );
    if (!savedGames) {
      return respErr("save game failed");
    }

    return respData(savedGames);
  } catch (e) {
    console.log("submit games failed", e);
    return respErr("submit games failed");
  }
}
