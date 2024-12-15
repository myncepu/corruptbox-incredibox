"use client";

import type { Game } from "@/types/game";
import GameItem from "./item";

export default ({
  games,
  loading,
}: {
  games: Game[];
  loading?: boolean;
}) => {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-5 py-4 md:px-10 md:py-4 lg:py-4">
        {!loading ? (
          <div className="mb-8 gap-5 py-4 [column-count:1] md:mb-12 md:[column-count:2] lg:mb-16 lg:[column-count:3]">
            {games.map((item: Game, idx: number) => {
              return (
                <div key={item.uuid}>
                  <GameItem game={item} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto text-center">Loading data...</div>
        )}
      </div>
    </section>
  );
};
