import type { Project } from "@/types/project";

export default function ({ project }: { project: Project }) {
  return (
    <img
      src={project.img_url || project.avatar_url || ""}
      alt={project.title}
      className="rounded-md"
    />
  );
}
