import { useState } from "react";
import type { Anime } from "../types/anime";

interface AdminProps {
  animeList: Anime[];
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
}

const GENRES = ["Action", "Drama", "Romance", "Comedy", "Fantasy", "Sci-Fi", "Horror"];
const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
const DAYS = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"];

export default function Admin({ animeList, setAnimeList }: AdminProps) {
  const [form, setForm] = useState<Anime>({
    id: Date.now(),
    title: "",
    year: new Date().getFullYear(),
    genre: "",
    rating: 0,
    image: "",
    description: "",
    season: "",
    broadcastDay: "",
  });

  const handleChange = (key: keyof Anime, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.title || !form.genre || !form.season || !form.broadcastDay) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newAnime = { ...form, id: Date.now() };
    const updated = [...animeList, newAnime];
    setAnimeList(updated);
    localStorage.setItem("animeList", JSON.stringify(updated));

    alert("✅ เพิ่มอนิเมะสำเร็จ!");
    setForm({
      id: Date.now(),
      title: "",
      year: new Date().getFullYear(),
      genre: "",
      rating: 0,
      image: "",
      description: "",
      season: "",
      broadcastDay: "",
    });
  };

  return (
    <div className="text-white max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">🛠️ เพิ่มอนิเมะใหม่</h2>

      <div className="space-y-4">
        {/* ชื่ออนิเมะ */}
        <input
          type="text"
          placeholder="ชื่ออนิเมะ"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* ปีที่ฉาย */}
        <input
          type="number"
          placeholder="ปีที่ออกฉาย"
          value={form.year}
          onChange={(e) => handleChange("year", Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* คะแนน (Rating) */}
        <input
          type="number"
          min={0}
          max={10}
          step="0.1"
          placeholder="⭐ กรอกคะแนน (0–10)"
          value={form.rating === 0 ? "" : form.rating}
          onChange={(e) => handleChange("rating", Number(e.target.value))}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* หมวดหมู่ (Genre) */}
        <select
          value={form.genre}
          onChange={(e) => handleChange("genre", e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        >
          <option value="">เลือกประเภท</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        {/* ซีซั่นที่ฉาย (Season) */}
        <select
          value={form.season}
          onChange={(e) => handleChange("season", e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        >
          <option value="">เลือกซีซั่น</option>
          {SEASONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* วันที่ออกอากาศ */}
        <select
          value={form.broadcastDay || ""}
          onChange={(e) => handleChange("broadcastDay", e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        >
          <option value="">เลือกวันออกอากาศ</option>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* รูปภาพประกอบ */}
        <input
          type="text"
          placeholder="ลิงก์รูปภาพ"
          value={form.image}
          onChange={(e) => handleChange("image", e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* คำอธิบาย */}
        <textarea
          placeholder="คำอธิบายอนิเมะ"
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 min-h-[80px]"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          บันทึกอนิเมะ
        </button>
      </div>
    </div>
  );
}
