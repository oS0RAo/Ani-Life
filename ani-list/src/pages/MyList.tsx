import type { Anime } from "../types/anime";

interface MyListProps {
  animeList: Anime[];
  onSelect: (anime: Anime) => void;
}

export default function MyList({ animeList, onSelect }: MyListProps) {
  const favorites = animeList.filter((a) => a.isFavorite);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-white">My List</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-400 text-center">ยังไม่มีอนิเมะใน My List 😢</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((anime) => (
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
        </div>
      )}
    </div>
  );
}
