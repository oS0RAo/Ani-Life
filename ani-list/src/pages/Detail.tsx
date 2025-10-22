import type { Anime } from "../types/anime";
import Tag from "../components/Tag";

interface DetailProps {
  anime: Anime;
  goBack: () => void;
  toggleFavorite: (anime: Anime) => void;
}

export default function Detail({ anime, goBack, toggleFavorite }: DetailProps) {
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

          <button
            onClick={() => toggleFavorite(anime)}
            className={`mt-6 px-4 py-2 rounded-md font-medium transition ${
              anime.isFavorite
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {anime.isFavorite ? "Remove from My List" : "Add to My List"}
          </button>
        </div>
      </div>
    </div>
  );
}
