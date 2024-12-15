import { LazyLoadImage } from "react-lazy-load-image-component";
import Link from "next/link";
import type { Game } from "@/types/game";
import Stars from "../stars";
import moment from "moment";

export default ({ game }: { game: Game }) => {
  return (
    <Link href={`/game/${game.slug}`}>
      <div className="mb-6 gap-6 overflow-hidden rounded-2xl border border-solid border-[#7e7e7e] bg-white p-8">
        <div className="mb-4 flex flex-row">
          {game.thumbnail_url && (
            <LazyLoadImage
              src={game.thumbnail_url}
              placeholderSrc={"/logo.png"}
              alt={game.slug}
              className="mr-4 inline-block h-16 w-16 object-cover rounded-full"
            />
          )}
          <div className="flex flex-col">
            <p className="text-base font-semibold">{game.title}</p>
          </div>
        </div>

        <div className="flex items-center">
          {true && <Stars />}
          <div className="flex-1" />

          <p className="text-slate-500 text-sm">
            {moment(game.created_at).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
};
