import { useState } from "react";
import type { Anime } from "../types/anime";

interface AdminProps {
  animeList: Anime[];
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
}

export default function Admin({ animeList, setAnimeList }: AdminProps) {
  const [form, setForm] = useState<Partial<Anime>>({});

  const addAnime = () => {
    if (!form.title || !form.image) return alert("กรุณากรอกชื่อและลิงก์รูปภาพให้ครบ!");

    const newAnime: Anime = {
      id: Date.now(),
      title: form.title!,
      year: Number(form.year) || new Date().getFullYear(),
      genre: form.genre || "Unknown",
      rating: Number(form.rating) || 0,
      image: form.image!,
      description: form.description || "No description provided.",
      season: form.season || "All",
      isFavorite: false,
    };

    setAnimeList([...animeList, newAnime]);
    setForm({});
    alert("เพิ่มอนิเมะใหม่เรียบร้อยแล้ว!");
  };

  const deleteAnime = (id: number) => {
    if (!confirm("ต้องการลบอนิเมะนี้หรือไม่?")) return;
    setAnimeList(animeList.filter((a) => a.id !== id));
  };

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Panel</h2>

      {/* ฟอร์มเพิ่มอนิเมะ */}
      <div className="bg-gray-800 p-6 rounded-xl mb-8 shadow-lg">
        <h3 className="font-semibold mb-4 text-xl">📝 Add New Anime</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {["title", "genre", "year", "rating", "image", "description", "season"].map(
            (field) => (
              <input
                key={field}
                placeholder={field.toUpperCase()}
                value={String(form[field as keyof Anime] ?? "")}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )
          )}
        </div>

        <button
          onClick={addAnime}
          className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition"
        >
          ➕ Add Anime
        </button>
      </div>

      {/* รายการอนิเมะทั้งหมด */}
      <h3 className="text-2xl font-bold mb-3">📚 Anime List</h3>
      {animeList.length === 0 ? (
        <p className="text-gray-400 text-center">ยังไม่มีอนิเมะในระบบ 😢</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {animeList.map((a) => (
            <div
              key={a.id}
              className="bg-gray-800 p-3 rounded-xl shadow-md hover:scale-105 transition transform"
            >
              <img
                src={a.image}
                alt={a.title}
                className="rounded-lg mb-2 w-full h-40 object-cover"
              />
              <h4 className="font-semibold truncate">{a.title}</h4>
              <p className="text-gray-400 text-sm">{a.genre}</p>
              <p className="text-sm text-yellow-400">⭐ {a.rating}</p>

              <button
                onClick={() => deleteAnime(a.id)}
                className="mt-2 w-full bg-red-600 hover:bg-red-700 py-1.5 rounded-md text-white transition"
              >
                ลบ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
