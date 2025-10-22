import React from "react";
import type { Anime } from "../types/anime";
import { sampleAnime } from "../data/sampleAnime";

interface ScheduleProps {
  onSelect: (anime: Anime) => void;
}

const weeklySchedule: { day: string; animeIds: number[] }[] = [
  { day: "จันทร์", animeIds: [1] },
  { day: "อังคาร", animeIds: [2] },
  { day: "พุธ", animeIds: [3] },
  { day: "พฤหัสบดี", animeIds: [] },
  { day: "ศุกร์", animeIds: [1, 3] },
  { day: "เสาร์", animeIds: [2] },
  { day: "อาทิตย์", animeIds: [1, 2, 3] },
];

export default function Schedule({ onSelect }: ScheduleProps) {
  const today = new Date().getDay(); // 0=อาทิตย์, 1=จันทร์, ...
  const dayNames = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
  const currentDay = dayNames[today];

  return (
    <div className="text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
        🗓️ ตารางออกอากาศอนิเมะ
      </h2>

      <p className="text-center text-gray-300 mb-6">
        วันนี้คือ <span className="text-blue-400 font-semibold">{currentDay}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeklySchedule.map((day) => {
          const animeList: Anime[] = sampleAnime.filter((a) =>
            day.animeIds.includes(a.id)
          );

          return (
            <div
              key={day.day}
              className={`p-5 rounded-2xl shadow-lg transition ${
                currentDay === day.day ? "bg-blue-800/50" : "bg-gray-800"
              }`}
            >
              <h3 className="text-xl font-semibold border-b border-gray-700 mb-3 pb-1">
                {day.day}
                {currentDay === day.day && (
                  <span className="ml-2 text-sm text-blue-300">(วันนี้)</span>
                )}
              </h3>

              {animeList.length > 0 ? (
                <ul className="space-y-3">
                  {animeList.map((anime) => (
                    <li
                      key={anime.id}
                      onClick={() => onSelect(anime)}
                      className="flex items-center space-x-3 bg-gray-900 p-2 rounded-lg hover:bg-blue-700/40 cursor-pointer transition"
                    >
                      <img
                        src={anime.image}
                        alt={anime.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium">{anime.title}</p>
                        <p className="text-sm text-gray-400">{anime.genre}</p>
                        <p className="text-sm text-gray-500">⭐ {anime.rating}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">ไม่มีอนิเมะออกอากาศวันนี้</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
