import type { Project } from "@/types/project";
import ProjectDetail from "@/templates/tailspark/landing/components/project";

export default function ({
  project,
  more_projects,
}: {
  project: Project;
  more_projects: Project[];
}) {
  return (
    <section className="relatve">
      <div className="mx-auto w-full max-w-7xl px-5 py-2">
        {project && (
          <ProjectDetail project={project} more_projects={more_projects} />
        )}
      </div>
    </section>
  );
}
