import React, { useState } from "react";
import type { Anime } from "../types/anime";

interface AdminProps {
  animeList: Anime[];
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
}

const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
];
const BROADCAST_DAYS = [
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
  "อาทิตย์",
];

export default function Admin({ animeList, setAnimeList }: AdminProps) {
  const [newAnime, setNewAnime] = useState<Anime>({
    id: animeList.length + 1,
    title: "",
    year: new Date().getFullYear(),
    genre: GENRES[0],
    rating: 0,
    image: "",
    description: "",
    season: SEASONS[0],
    broadcastDay: BROADCAST_DAYS[0],
  });

  const handleChange = (field: keyof Anime, value: any) => {
    setNewAnime((prev) => ({ ...prev, [field]: value }));
  };

  const addAnime = () => {
    if (!newAnime.title.trim()) return alert("กรุณากรอกชื่ออนิเมะ");

    const updatedList = [...animeList, { ...newAnime, id: Date.now() }];
    setAnimeList(updatedList);
    localStorage.setItem("animeList", JSON.stringify(updatedList));

    setNewAnime({
      id: animeList.length + 1,
      title: "",
      year: new Date().getFullYear(),
      genre: GENRES[0],
      rating: 0,
      image: "",
      description: "",
      season: SEASONS[0],
      broadcastDay: BROADCAST_DAYS[0],
    });
  };

  const deleteAnime = (id: number) => {
    if (!confirm("ต้องการลบอนิเมะนี้หรือไม่?")) return;
    const updated = animeList.filter((a) => a.id !== id);
    setAnimeList(updated);
    localStorage.setItem("animeList", JSON.stringify(updated));
  };

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        ⚙️ ระบบจัดการอนิเมะ (Admin)
      </h1>

      {/* 🆕 ฟอร์มเพิ่มอนิเมะ */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">เพิ่มอนิเมะใหม่</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ชื่ออนิเมะ"
            value={newAnime.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="p-2 rounded bg-gray-700 focus:outline-none"
          />
          <input
            type="number"
            placeholder="ปีที่ออกฉาย"
            value={newAnime.year}
            onChange={(e) => handleChange("year", Number(e.target.value))}
            className="p-2 rounded bg-gray-700 focus:outline-none"
          />

          {/* ✅ dropdown genre */}
          <select
            value={newAnime.genre}
            onChange={(e) => handleChange("genre", e.target.value)}
            className="p-2 rounded bg-gray-700"
          >
            {GENRES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>

          {/* ✅ dropdown season */}
          <select
            value={newAnime.season}
            onChange={(e) => handleChange("season", e.target.value)}
            className="p-2 rounded bg-gray-700"
          >
            {SEASONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <input
            type="number"
            step="0.1"
            placeholder="กรอกคะแนน (0–10)"
            value={newAnime.rating === 0 ? "" : newAnime.rating}
            onChange={(e) => handleChange("rating", Number(e.target.value))}
            className="p-2 rounded bg-gray-700 focus:outline-none"
            min={0}
            max={10}
          />

          {/* ✅ dropdown วันที่ฉาย */}
          <select
            value={newAnime.broadcastDay}
            onChange={(e) => handleChange("broadcastDay", e.target.value)}
            className="p-2 rounded bg-gray-700"
          >
            {BROADCAST_DAYS.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="ลิงก์รูปภาพ"
            value={newAnime.image}
            onChange={(e) => handleChange("image", e.target.value)}
            className="p-2 rounded bg-gray-700 focus:outline-none col-span-full"
          />

          <textarea
            placeholder="คำอธิบาย"
            value={newAnime.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="p-2 rounded bg-gray-700 focus:outline-none col-span-full"
          />
        </div>

        <button
          onClick={addAnime}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium"
        >
          ➕ เพิ่มอนิเมะ
        </button>
      </div>

      {/* รายการอนิเมะที่มีอยู่ */}
      <h2 className="text-xl font-semibold mb-3">📜 รายการทั้งหมด</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animeList.map((anime) => (
          <div
            key={anime.id}
            className="bg-gray-800 rounded-lg p-4 shadow-md flex flex-col"
          >
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{anime.title}</h3>
            <p className="text-sm text-gray-400">
              {anime.genre} • {anime.season} • {anime.broadcastDay}
            </p>
            <p className="text-sm text-gray-500">⭐ {anime.rating}</p>

            <button
              onClick={() => deleteAnime(anime.id)}
              className="mt-3 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-md text-sm"
            >
              ลบ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
