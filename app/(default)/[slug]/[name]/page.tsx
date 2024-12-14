import { findProjectByName, getRandomProjects } from "@/models/project";

import Single from "@/templates/tailspark/landing/pages/single";
import pagejson from "@/pagejson/en.json";

export const runtime = "edge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const project = await findProjectByName(name);

  return {
    title: `${project?.title || "-"} | ${pagejson?.metadata?.title}`,
    description: project?.description || "-",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL}/server/${name}`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const project = await findProjectByName(name);
  if (!project || !project.uuid) {
    return <div>Project not found</div>;
  }

  const more_projects = await getRandomProjects(1, 50);

  return <Single project={project} more_projects={more_projects} />;
}
