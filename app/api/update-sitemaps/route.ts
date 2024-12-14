import * as xmlbuilder from "xmlbuilder";

import { getProjects } from "@/models/project";
import moment from "moment";
import { respData } from "@/utils/resp";
import { writeFile } from "node:fs";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    let { batch_no, limit, page_step } = await req.json();
    if (!batch_no) {
      batch_no = 1;
    }
    if (!limit) {
      limit = 50;
    }
    if (!page_step) {
      page_step = 5;
    }

    const start_page = (batch_no - 1) * page_step + 1;
    const end_page = start_page + page_step - 1;
    let page = start_page;
    let total = 0;

    const root = xmlbuilder.create("urlset", {
      version: "1.0",
      encoding: "UTF-8",
    });
    root.att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");

    while (true) {
      const projects = await getProjects(page, limit);
      const projects_len = projects.length;
      console.log("batch get projects:", page, projects_len);
      page += 1;
      total += projects_len;

      for (const project of projects) {
        const urlElement = root.ele("url");
        urlElement.ele("loc", `https://mcp.so/server/${project.name}`);
        urlElement.ele(
          "lastmod",
          moment(project.updated_at).format("YYYY-MM-DD")
        );
        // urlElement.ele("changefreq", "monthly");
        // urlElement.ele("priority", "0.6");
      }

      if (page > end_page || projects_len === 0) {
        break;
      }
    }

    const xmlString = root.end({ pretty: true });

    const fileName = `public/sitemap_projects_${batch_no}.xml`;
    writeFile(fileName, xmlString, (err) => {
      if (err) {
        console.error("write sitemap failed:", err);
        return;
      }
    });

    return respData({
      start_page: start_page,
      end_page: end_page,
      page: page,
      limit: limit,
      total: total,
    });
  } catch (e) {
    console.log("update sitemap failed: ", e);
    return Response.json({ error: e });
  }
}
