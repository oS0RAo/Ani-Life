import type { Anime } from "../types/anime";

interface DetailProps {
  anime: Anime;
  goBack: () => void;
}

export default function Detail({ anime, goBack }: DetailProps) {
  return (
    <div className="text-white">
      <button onClick={goBack} className="text-blue-400 mb-4">&larr; Back</button>
      <div className="flex flex-col md:flex-row gap-6">
        <img src={anime.image} alt={anime.title} className="w-full md:w-1/3 rounded-lg shadow-lg" />
        <div>
          <h2 className="text-3xl font-bold mb-2">{anime.title}</h2>
          <p className="text-gray-400 mb-2">{anime.genre} • {anime.year}</p>
          <p className="mb-4">{anime.description}</p>
          <p className="font-semibold">⭐ Rating: {anime.rating}</p>
        </div>
      </div>
    </div>
  );
}
