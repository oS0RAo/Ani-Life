import React, { useState } from "react";
import type { Anime } from "../types/anime";
import AdminForm from "../components/AdminForm";

const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Romance", "Sci-Fi", "Slice of Life",
];
const BROADCAST_DAYS = [
  "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์",
];

export default function Admin({ animeList, setAnimeList }: {
  animeList: Anime[]; setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterSeason, setFilterSeason] = useState("");
  const [filterDay, setFilterDay] = useState("");

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
    trailerUrl: "",
    platforms: [],
    characters: [],
  });

  const resetForm = () => {
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
      trailerUrl: "",
      platforms: [],
    });
    setEditingId(null);
  };

  const editAnime = (anime: Anime) => {
    setNewAnime(anime);
    setEditingId(anime.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteAnime = (id: number) => {
    if (!confirm("ต้องการลบอนิเมะนี้หรือไม่?")) return;
    const updated = animeList.filter((a) => a.id !== id);
    setAnimeList(updated);
    localStorage.setItem("animeList", JSON.stringify(updated));
  };

  const filteredAnime = animeList.filter((anime) => {
    const matchSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchGenre = !filterGenre || anime.genre === filterGenre;
    const matchSeason = !filterSeason || anime.season === filterSeason;
    const matchDay = !filterDay || anime.broadcastDay === filterDay;
    return matchSearch && matchGenre && matchSeason && matchDay;
  });

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">⚙️ ระบบจัดการอนิเมะ</h1>

      <AdminForm
        animeList={animeList}
        setAnimeList={setAnimeList}
        editingId={editingId}
        setEditingId={setEditingId}
        newAnime={newAnime}
        setNewAnime={setNewAnime}
        resetForm={resetForm}
      />

      {/* 🔍 ส่วนค้นหาและกรอง */}
      <div className="flex flex-wrap gap-3 mb-6 bg-gray-800 p-4 rounded-lg items-center">
        <input
          type="text"
          placeholder="🔍 ค้นหาชื่ออนิเมะ..."
          className="p-2 rounded bg-gray-700 flex-1 min-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="p-2 rounded bg-gray-700"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}>
          <option value="">🎭 ทุกแนว</option>
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select className="p-2 rounded bg-gray-700"
          value={filterSeason}
          onChange={(e) => setFilterSeason(e.target.value)}>
          <option value="">🍁 ทุกซีซัน</option>
          {SEASONS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select className="p-2 rounded bg-gray-700"
          value={filterDay}
          onChange={(e) => setFilterDay(e.target.value)}>
          <option value="">📅 ทุกวันออกอากาศ</option>
          {BROADCAST_DAYS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* 📚 รายการอนิเมะ */}
      <h2 className="text-xl font-semibold mb-3">📚 รายการทั้งหมด ({filteredAnime.length})</h2>
      {filteredAnime.length === 0 ? (
        <p className="text-gray-400">ไม่พบอนิเมะที่ตรงกับการค้นหา</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAnime.map((anime) => (
            <div key={anime.id} className="bg-gray-800 rounded-lg p-4 shadow-md">
              <img src={anime.image} alt={anime.title} className="w-full h-48 object-cover rounded-md mb-3" />
              <h3 className="text-lg font-semibold">{anime.title}</h3>
              <p className="text-sm text-gray-400">{anime.genre} | {anime.season}</p>
              <p className="text-sm text-gray-500 mb-3">📅 {anime.broadcastDay}</p>
              <div className="flex gap-2">
                <button onClick={() => editAnime(anime)} className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm">✏️ แก้ไข</button>
                <button onClick={() => deleteAnime(anime.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">🗑️ ลบ</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
