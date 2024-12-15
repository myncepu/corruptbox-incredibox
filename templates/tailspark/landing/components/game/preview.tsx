import type { Game } from "@/types/game";
import Image from "next/image";

export default function Preview({ game }: { game: Game }) {
  return (
    <div className="relative w-full h-full bg-gray-800 rounded-lg overflow-hidden">
      <Image
        src={game.thumbnail_url}
        alt={game.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h2 className="text-xl font-bold text-gray-100">{game.title}</h2>
        <p className="mt-2 text-sm text-gray-300">{game.description}</p>
      </div>
    </div>
  );
}
