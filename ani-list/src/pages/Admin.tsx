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

const PLATFORM_OPTIONS = [
  "Netflix",
  "Bilibili",
  "Crunchyroll",
  "Muse Thailand",
  "Ani-One Asia",
  "Disney+ Hotstar",
  "YouTube",
  "กำหนดเอง",
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
    platforms: [],
  });

  const [newPlatform, setNewPlatform] = useState({
    name: "",
    customName: "",
    episodes: [] as any[],
  });
  const [newEpisode, setNewEpisode] = useState({
    title: "",
    url: "",
    description: "",
    thumbnail: "",
  });

  const handleChange = (field: keyof Anime, value: any) => {
    setNewAnime((prev) => ({ ...prev, [field]: value }));
  };

  const addEpisode = () => {
    if (!newEpisode.title.trim() || !newEpisode.url.trim())
      return alert("กรุณากรอกชื่อและลิงก์ตอน");

    setNewPlatform((prev) => ({
      ...prev,
      episodes: [...prev.episodes, newEpisode],
    }));
    setNewEpisode({ title: "", url: "", description: "", thumbnail: "" });
  };

  const addPlatform = () => {
    const platformName =
      newPlatform.name === "กำหนดเอง" ? newPlatform.customName : newPlatform.name;

    if (!platformName.trim()) return alert("กรุณากรอกชื่อแพลตฟอร์ม");

    setNewAnime((prev) => ({
      ...prev,
      platforms: [...(prev.platforms || []), { ...newPlatform, name: platformName }],
    }));

    setNewPlatform({ name: "", customName: "", episodes: [] });
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
      platforms: [],
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

      {/* ฟอร์มเพิ่มอนิเมะ */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">เพิ่มอนิเมะใหม่</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="ชื่ออนิเมะ"
            value={newAnime.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="p-2 rounded bg-gray-700"
          />
          <input
            type="number"
            placeholder="ปีที่ออกฉาย"
            value={newAnime.year}
            onChange={(e) => handleChange("year", Number(e.target.value))}
            className="p-2 rounded bg-gray-700"
          />
          <select
            value={newAnime.genre}
            onChange={(e) => handleChange("genre", e.target.value)}
            className="p-2 rounded bg-gray-700"
          >
            {GENRES.map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
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
            placeholder="คะแนน (0–10)"
            value={newAnime.rating === 0 ? "" : newAnime.rating}
            onChange={(e) => handleChange("rating", Number(e.target.value))}
            className="p-2 rounded bg-gray-700"
          />
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
            className="p-2 rounded bg-gray-700 col-span-full"
          />
          <textarea
            placeholder="คำอธิบาย"
            value={newAnime.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="p-2 rounded bg-gray-700 col-span-full"
          />
        </div>

        {/*  เพิ่มแพลตฟอร์ม */}
        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">เพิ่มแพลตฟอร์ม</h3>

          <select
            value={newPlatform.name}
            onChange={(e) => setNewPlatform((p) => ({ ...p, name: e.target.value }))}
            className="p-2 rounded bg-gray-800 w-full mb-2"
          >
            <option value="">เลือกแพลตฟอร์ม</option>
            {PLATFORM_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          {newPlatform.name === "กำหนดเอง" && (
            <input
              type="text"
              placeholder="กรอกชื่อแพลตฟอร์มเอง"
              value={newPlatform.customName}
              onChange={(e) =>
                setNewPlatform((p) => ({ ...p, customName: e.target.value }))
              }
              className="p-2 rounded bg-gray-800 w-full mb-2"
            />
          )}

          {/* เพิ่มตอน */}
          <div className="bg-gray-800 p-3 rounded mb-3">
            <h4 className="text-sm mb-2 font-semibold text-blue-300">เพิ่มตอน</h4>
            <input
              type="text"
              placeholder="ชื่อตอน"
              value={newEpisode.title}
              onChange={(e) =>
                setNewEpisode((ep) => ({ ...ep, title: e.target.value }))
              }
              className="p-2 rounded bg-gray-700 w-full mb-2"
            />
            <input
              type="text"
              placeholder="ลิงก์ตอน"
              value={newEpisode.url}
              onChange={(e) =>
                setNewEpisode((ep) => ({ ...ep, url: e.target.value }))
              }
              className="p-2 rounded bg-gray-700 w-full mb-2"
            />
            <input
              type="text"
              placeholder="ลิงก์รูปตัวอย่าง (thumbnail)"
              value={newEpisode.thumbnail}
              onChange={(e) =>
                setNewEpisode((ep) => ({ ...ep, thumbnail: e.target.value }))
              }
              className="p-2 rounded bg-gray-700 w-full mb-2"
            />
            <textarea
              placeholder="คำอธิบายตอน"
              value={newEpisode.description}
              onChange={(e) =>
                setNewEpisode((ep) => ({ ...ep, description: e.target.value }))
              }
              className="p-2 rounded bg-gray-700 w-full mb-2"
            />
            <button
              onClick={addEpisode}
              className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            >
              ➕ เพิ่มตอน
            </button>
          </div>

          {newPlatform.episodes.length > 0 && (
            <ul className="text-sm text-gray-300 mb-2">
              {newPlatform.episodes.map((ep, i) => (
                <li key={i}>• {ep.title}</li>
              ))}
            </ul>
          )}

          <button
            onClick={addPlatform}
            className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded"
          >
            ➕ เพิ่มแพลตฟอร์ม
          </button>
        </div>

        <button
          onClick={addAnime}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium"
        >
          ✅ เพิ่มอนิเมะ
        </button>
      </div>

      {/* รายการอนิเมะ */}
      <h2 className="text-xl font-semibold mb-3">รายการทั้งหมด</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animeList.map((anime) => (
          <div key={anime.id} className="bg-gray-800 rounded-lg p-4 shadow-md">
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="text-lg font-semibold">{anime.title}</h3>
            <p className="text-sm text-gray-400">
              {anime.genre} • {anime.season} • {anime.broadcastDay}
            </p>

            {anime.platforms && anime.platforms.length > 0 && (
              <div className="text-gray-300 text-sm mt-2 space-y-1">
                <p className="font-semibold text-blue-300">แพลตฟอร์ม:</p>
                {anime.platforms.map((p, i) => (
                  <p key={i}>
                    • {p.name} — {p.episodes?.length || 0} ตอน
                  </p>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-500 mt-2">⭐ {anime.rating}</p>
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
