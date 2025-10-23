import { useState } from "react";
import type { Anime } from "../types/anime";

interface ScheduleProps {
  animeList: Anime[];
  onSelect: (anime: Anime) => void;
}

const DAYS = [
  "ทั้งหมด",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
  "อาทิตย์",
];

function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1;
  if (month <= 3) return "Winter";
  if (month <= 6) return "Spring";
  if (month <= 9) return "Summer";
  return "Fall";
}

export default function Schedule({ animeList, onSelect }: ScheduleProps) {
  const [selectedDay, setSelectedDay] = useState("ทั้งหมด");

  const currentSeason = getCurrentSeason();
  const currentYear = new Date().getFullYear();

  const currentSeasonAnime = animeList.filter(
    (a) => a.season === currentSeason && a.year === currentYear
  );

  const filteredAnime =
    selectedDay === "ทั้งหมด"
      ? currentSeasonAnime
      : currentSeasonAnime.filter((a) => a.broadcastDay === selectedDay);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-white">
        ตารางออกอากาศ ({currentSeason} {currentYear})
      </h1>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              selectedDay === day
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredAnime.map((anime) => (
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
              <p className="text-gray-400 text-sm">
                {anime.genre} • {anime.broadcastDay}
              </p>
            </div>
          </div>
        ))}

        {filteredAnime.length === 0 && (
          <p className="text-gray-400 text-center col-span-full mt-6">
            ไม่มีอนิเมะที่ฉายในวันนี้
          </p>
        )}
      </div>
    </div>
  );
}
