import { useState } from "react";
import type { Anime } from "../types/anime";
import SeasonSelector from "../components/SeasonSelector";

interface HomeProps {
  animeList: Anime[];
  onSelect: (anime: Anime) => void;
}

export default function Home({ animeList, onSelect }: HomeProps) {
  const [selectedSeason, setSelectedSeason] = useState("All");

  const filtered =
    selectedSeason === "All"
      ? animeList
      : animeList.filter((a) => a.season === selectedSeason);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-white">Anime List</h1>
      <SeasonSelector onSelect={(s) => setSelectedSeason(s)} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((anime) => (
          <div
            key={anime.id}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform"
            onClick={() => onSelect(anime)}
          >
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <h2 className="font-semibold text-white">{anime.title}</h2>
              <p className="text-gray-400 text-sm">{anime.genre}</p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-400 text-center col-span-full mt-6">
            ไม่มีอนิเมะในซีซันนี้
          </p>
        )}
      </div>
    </div>
  );
}
