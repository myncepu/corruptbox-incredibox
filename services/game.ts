import {
  GameStatus,
  findGameBySlug,
  insertGame,
  updateGame,
} from "@/models/game";

import type { ChatCompletionCreateParamsNonStreaming } from "openai/resources/index.mjs";
import type { Game } from "@/types/game";
import { extractProjectPrompt } from "@/services/prompts/extract_project";
import { genUuid } from "@/utils";
import { getIsoTimestr } from "@/utils/time";
import { getOpenAIClient } from "@/services/llms/openai";
import { readUrl } from "./reader/jina";
import { summarizeProjectPrompt } from "./prompts/summarize_project";

export function parseGame(game: Game): Game | undefined {
  try {
    if (!game || !game.game_url) {
      return;
    }

    if (!game.game_url.startsWith("https://github.com")) {
      return;
    }

    if (!game.slug) {
      const urlParts = game.game_url.split("/");
      game.slug = urlParts[urlParts.length - 1];
      if (!game.slug) {
        return;
      }
    }

    if (!game.title) {
      game.title = game.slug
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    return game;
  } catch (e) {
    console.log("parse game failed", e);
    return;
  }
}

export async function extractGame(content: string): Promise<Game> {
  try {
    const prompt = extractProjectPrompt.replace("{content}", content);
    const openai = getOpenAIClient();

    const params: ChatCompletionCreateParamsNonStreaming = {
      model: process.env.OPENAI_MODEL as string,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    };

    console.log("request llm params: ", openai.baseURL, params);

    const res = await openai.chat.completions.create(params);

    const result = res.choices[0].message.content;

    const project = JSON.parse(result || "{}");
    if (!project.name || !project.title || !project.description) {
      throw new Error("project is invalid");
    }

    return project;
  } catch (e) {
    console.error("extract project failed: ", e);
    throw e;
  }
}

// export async function sumGame(game: Game): Promise<Game> {
//   try {
//     if (!game || !game.uuid || !game.slug || !game.game_url) {
//       throw new Error("invalid game");
//     }

//     let content_url = game.game_url;

//     if (content_url.startsWith("https://github.com")) {
//       const githubUrl = new URL(content_url);
//       const [owner, repo] = githubUrl.pathname.slice(1).split("/");
//       if (owner === "modelcontextprotocol") {
//         content_url = `https://raw.githubusercontent.com/${owner}/servers/main/src/${game.slug}/README.md`;
//       } else {
//         content_url = `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`;
//       }
//     }

//     console.log("game", game, content_url);

//     const gameUpdatedAt = game.updated_at;

//     if (!game.content && content_url) {
//       const post = await readUrl(content_url);
//       console.log("post", post);
//       if (post?.content && post.content.length > 100) {
//         game.content = post.content;
//         game.updated_at = getIsoTimestr();
//       }
//     }

//     if (!game.summary && game.content) {
//       const summarizedGame = await summarizeGame(game);
//       game.category = summarizedGame.category;
//       game.tags = Array.isArray(summarizedGame.tags)
//         ? summarizedGame.tags.join(",")
//         : summarizedGame.tags;
//       game.summary = summarizedGame.summary;
//       game.target = "_self";
//       game.updated_at = getIsoTimestr();
//     }

//     if (gameUpdatedAt !== game.updated_at) {
//       await updateGame(game.uuid, game);
//     }

//     return game;
//   } catch (e) {
//     console.log("summarize game failed: ", e);
//     return game;
//   }
// }

export async function summarizeGame(game: Game): Promise<Game> {
  try {
    const prompt = summarizeProjectPrompt.replace(
      "{project}",
      JSON.stringify(game)
    );
    const openai = getOpenAIClient();

    const params: ChatCompletionCreateParamsNonStreaming = {
      model: process.env.OPENAI_MODEL as string,
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    };

    console.log("request llm params: ", openai.baseURL, params);

    const res = await openai.chat.completions.create(params);

    const result = res.choices[0].message.content;

    console.log("summarize project result: ", result);

    const summarizedProject = JSON.parse(result || "{}");
    if (!summarizedProject.summary) {
      throw new Error("summary is invalid");
    }

    return summarizedProject;
  } catch (e) {
    console.error("summarize project failed: ", e);
    throw e;
  }
}

// export async function saveGame(
//   game: Game
// ): Promise<Game | undefined> {
//   try {
//     if (!game.name) {
//       throw new Error("invalid game");
//     }

//     const existGame = await findGameByName(game.name);

//     if (existGame?.uuid) {
//       game.uuid = existGame.uuid;
//       game.created_at = existGame.created_at;
//       await updateGame(existGame.uuid, game);
//       return { ...existGame, ...game };
//     }

//     const created_at = getIsoTimestr();

//     game.uuid = genUuid();
//     game.created_at = created_at;
//     game.updated_at = created_at;
//     game.is_featured = true;
//     game.sort = 1;

//     await insertGame(game);

//     return game;
//   } catch (e) {
//     console.error("save game failed: ", e);
//     throw e;
//   }
// }
