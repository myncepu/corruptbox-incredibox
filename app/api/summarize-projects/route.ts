import { respData, respErr } from "@/utils/resp";

import { getProjectsWithoutSummary } from "@/models/game";
import { sumProject } from "@/services/game";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { page, limit } = await req.json();

    const projects = await getProjectsWithoutSummary(page, limit);
    console.log("projects", projects);

    const summarizedProjects = await Promise.all(
      projects
        .filter((project) => project.uuid && project.name && project.url)
        .map((project) => sumProject(project))
    );

    return respData(summarizedProjects);
  } catch (e) {
    console.log("summarize projects failed: ", e);
    return respErr("summarize projects failed");
  }
}
