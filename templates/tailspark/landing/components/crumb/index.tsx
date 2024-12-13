import { FiHome } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Project } from "@/types/project";

export default ({ project }: { project: Project }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <a className="text-gray-400 hover:text-gray-500" href="/">
              <FiHome />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>

        {/* <li>
          <div className="flex items-center">
            <MdKeyboardArrowRight />
            <a
              className="ml-2 text-md font-medium text-gray-500 hover:text-gray-700"
              aria-current="page"
              href={"/servers"}
            >
              servers
            </a>
          </div>
        </li> */}

        <li>
          <div className="flex items-center">
            <MdKeyboardArrowRight />
            <a
              className="ml-2 text-md font-medium text-gray-500 hover:text-gray-700"
              aria-current="page"
              // href={renameShortUrl(gpts.short_url, gpts.uuid)}
            >
              {project.name}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  );
};