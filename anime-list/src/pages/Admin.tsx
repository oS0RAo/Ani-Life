import { useState } from "react";
import type { Anime } from "../types/anime";

interface AdminProps {
  animeList: Anime[];
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
}

export default function Admin({ animeList, setAnimeList }: AdminProps) {
  const [form, setForm] = useState<Partial<Anime>>({});

  const addAnime = () => {
    if (!form.title || !form.image) return alert("กรุณากรอกข้อมูลให้ครบ");
    const newAnime: Anime = {
      id: Date.now(),
      title: form.title!,
      year: Number(form.year) || new Date().getFullYear(),
      genre: form.genre || "Unknown",
      rating: Number(form.rating) || 0,
      image: form.image!,
      description: form.description || "",
    };
    setAnimeList([...animeList, newAnime]);
    setForm({});
  };

  const deleteAnime = (id: number) => {
    setAnimeList(animeList.filter((a) => a.id !== id));
  };

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Add New Anime</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {["title", "genre", "year", "rating", "image", "description"].map((field) => (
            <input
              key={field}
              placeholder={field.toUpperCase()}
              value={form[field as keyof Anime] || ""}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
          ))}
        </div>
        <button onClick={addAnime} className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
          Add Anime
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {animeList.map((a) => (
          <div key={a.id} className="bg-gray-800 p-3 rounded shadow">
            <img src={a.image} alt={a.title} className="rounded mb-2 w-full h-40 object-cover" />
            <h4 className="font-semibold">{a.title}</h4>
            <button onClick={() => deleteAnime(a.id)} className="mt-2 text-red-400 hover:text-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
