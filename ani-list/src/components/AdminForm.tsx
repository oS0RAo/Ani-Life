import { useState } from "react";
import { type Anime } from "../types/anime";

interface Props {
  onAdd: (anime: Anime) => void;
}

export default function AdminForm({ onAdd }: Props) {
  const [form, setForm] = useState<Partial<Anime>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.image) return;

    const newAnime: Anime = {
      id: Date.now(),
      title: form.title!,
      year: Number(form.year) || 2025,
      genre: form.genre || "Unknown",
      rating: Number(form.rating) || 0,
      image: form.image!,
      description: form.description || "",
    };
    onAdd(newAnime);
    setForm({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
      <input className="border p-2 w-full rounded" placeholder="ชื่ออนิเมะ"
        value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input className="border p-2 w-full rounded" placeholder="ปี"
        value={form.year || ""} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} />
      <input className="border p-2 w-full rounded" placeholder="ประเภท"
        value={form.genre || ""} onChange={(e) => setForm({ ...form, genre: e.target.value })} />
      <input className="border p-2 w-full rounded" placeholder="คะแนน"
        value={form.rating || ""} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
      <input className="border p-2 w-full rounded" placeholder="URL รูปภาพ"
        value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      <textarea className="border p-2 w-full rounded" placeholder="คำอธิบาย"
        value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700">เพิ่มอนิเมะ</button>
    </form>
  );
}
