import type { Anime } from "../types/anime";

interface Props {
  anime: Anime;
  onSelect: (anime: Anime) => void;
}

export default function AnimeCard({ anime, onSelect }: Props) {
  return (
    <div onClick={() => onSelect(anime)} className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
      <img src={anime.image} alt={anime.title} className="rounded-t-lg h-60 w-full object-cover" />
      <div className="p-3">
        <h3 className="font-semibold text-lg">{anime.title}</h3>
        <p className="text-sm text-gray-500">{anime.genre} • {anime.year}</p>
        <p className="text-yellow-600 font-medium mt-1">⭐ {anime.rating}</p>
      </div>
    </div>
  );
}
