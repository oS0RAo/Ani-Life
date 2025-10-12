import Tag from "../components/Tag";
import type { Anime } from "../types/anime";

interface DetailProps {
  anime: Anime;
  goBack: () => void;
}

export default function Detail({ anime, goBack }: DetailProps) {
  return (
    <div className="text-white">
      <button onClick={goBack} className="text-blue-400 mb-4 hover:underline">
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full md:w-64 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{anime.title}</h1>
          <p className="text-gray-400">{anime.year}</p>

          <div className="flex gap-2 mt-2">
            <Tag label={anime.genre} color="#10b981" />
            <Tag label={`⭐ ${anime.rating}`} color="#f59e0b" />
            {anime.season && <Tag label={anime.season} color="#3b82f6" />}
          </div>

          <p className="mt-4 text-gray-300">{anime.description}</p>
        </div>
      </div>
    </div>
  );
}
