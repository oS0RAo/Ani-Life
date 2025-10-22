import { useState } from "react";
import type { Anime } from "../types/anime";

interface BrowseProps {
  animeList: Anime[];
  onSelect: (anime: Anime) => void;
}

export default function Browse({ animeList, onSelect }: BrowseProps) {
  const [query, setQuery] = useState("");

  const filtered = animeList.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-4">Browse Anime</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ค้นหาอนิเม..."
        className="w-full mb-6 p-2 rounded bg-gray-800 text-white border border-gray-700"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((anime) => (
          <div
            key={anime.id}
            onClick={() => onSelect(anime)}
            className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition cursor-pointer"
          >
            <img src={anime.image} alt={anime.title} className="rounded-md mb-3 w-full h-60 object-cover" />
            <h3 className="text-lg font-semibold">{anime.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
