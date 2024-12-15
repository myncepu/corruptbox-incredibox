import { BiCategory } from "react-icons/bi";
import { BsTags } from "react-icons/bs";
import Crumb from "../crumb";
import Markdown from "@/components/markdown";
import Preview from "./preview";
import type { Game } from "@/types/game";
import Games from "../games";
import Stars from "../stars";
import moment from "moment";
import GameIframe from "./iframe";

export default ({
  game,
  more_games,
}: {
  game: Game;
  more_games?: Game[];
}) => {
  // const tagsArr = game.tags ? game.tags.split(",") : [];

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-8 md:px-10 md:py-8 lg:py-8">
        <div className="w-full mb-4 text-lg">
          <Crumb game={game} />
        </div>


        {/* <div className="grid gap-12 sm:gap-20 lg:grid-cols-2"> */}
        <div>
          <div className="flex flex-col items-start gap-2">
            <GameIframe game={game} />
            <div className="flex items-center gap-2 mt-4">
              <p className="text-md sm:text-md">
                Created at{" "}
                <span className="text-primary">
                  {moment(game.created_at).fromNow()}
                </span>
              </p>
            </div>
            <div className="mt-4">
              <Stars />
            </div>
            <div className="mb-6 flex flex-col gap-2 text-sm text-[#808080] sm:text-base lg:mb-8">
              <p className="font-medium">
                <BiCategory className="inline-block mr-2" />
                Categories
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-primary text-xs border border-solid border-primary rounded-md px-2 py-1">
                  {game.category?.name}
                </span>
              </div>
              <p className="font-medium mt-4">
                <BsTags className="inline-block mr-2" />
                Tags
              </p>
              {/* {tagsArr?.map((tag) => (
                <p key={tag}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    readOnly
                    checked={tagsArr?.includes(tag)}
                    aria-label={`Tag: ${tag}`}
                    id={`tag-${tag}`}
                  />
                  <label htmlFor={`tag-${tag}`}>{tag}</label>
                </p>
              ))} */}
            </div>

          </div>
        </div>
      </div>

      {game.description && (
        <div className="w-full md:max-w-7xl mx-auto px-8 py-4 mt-16 text-left border border-gray-200 rounded-lg">
          <Markdown content={game.description || ""} />
        </div>
      )}

      <div className="w-full text-center">
        <p className="mx-auto font-bold text-3xl mt-16 mb-4">View More</p>
        {more_games && <Games games={more_games} />}
      </div>
    </section>
  );
};
