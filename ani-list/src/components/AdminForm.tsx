import React, { useState } from "react";
import type { Anime } from "../types/anime";

interface AdminFormProps {
  animeList: Anime[];
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
  editingId: number | null;
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  newAnime: Anime;
  setNewAnime: React.Dispatch<React.SetStateAction<Anime>>;
  resetForm: () => void;
}

const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Romance", "Sci-Fi", "Slice of Life",
];
const BROADCAST_DAYS = [
  "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์",
];
const PLATFORM_OPTIONS = [
  "Netflix", "Bilibili", "Crunchyroll", "Muse Thailand",
  "Ani-One Asia", "Disney+ Hotstar", "YouTube", "กำหนดเอง",
];

export default function AdminForm({
  animeList, setAnimeList,
  editingId, setEditingId,
  newAnime, setNewAnime,
  resetForm,
}: AdminFormProps) {
  const [newPlatform, setNewPlatform] = useState({ name: "", customName: "", episodes: [] as any[] });
  const [newEpisode, setNewEpisode] = useState({ title: "", url: "" });

  // ส่วนจัดการตัวละคร
  const [newCharacter, setNewCharacter] = useState({ id: 0, name: "", role: "", image: "" });
  const [editingCharacterId, setEditingCharacterId] = useState<number | null>(null);

  const handleChange = (field: keyof Anime, value: any) => {
    setNewAnime((prev) => ({ ...prev, [field]: value }));
  };

  /* ==============================
       ฟังก์ชัน Platform & Episode
  ============================== */
  const addPlatform = () => {
    const name = newPlatform.name === "กำหนดเอง" ? newPlatform.customName : newPlatform.name;
    if (!name.trim()) return alert("กรุณากรอกชื่อแพลตฟอร์ม");
    const updated = [...(newAnime.platforms || []), { ...newPlatform, name }];
    setNewAnime({ ...newAnime, platforms: updated });
    setNewPlatform({ name: "", customName: "", episodes: [] });
  };

  const addEpisodeToExistingPlatform = (platformIndex: number) => {
    const updatedPlatforms = [...(newAnime.platforms || [])];
    updatedPlatforms[platformIndex].episodes.push({
      id: Date.now(),
      number: updatedPlatforms[platformIndex].episodes.length + 1,
      title: "",
      url: "",
    });
    setNewAnime({ ...newAnime, platforms: updatedPlatforms });
  };

  const deletePlatform = (i: number) => {
    const updated = [...(newAnime.platforms || [])];
    updated.splice(i, 1);
    setNewAnime({ ...newAnime, platforms: updated });
  };

  const deleteEpisode = (pi: number, ei: number) => {
    const updated = [...(newAnime.platforms || [])];
    updated[pi].episodes.splice(ei, 1);
    setNewAnime({ ...newAnime, platforms: updated });
  };

  const addEpisodeToNewPlatform = () => {
    if (!newEpisode.title || !newEpisode.url)
      return alert("กรุณากรอกชื่อตอนและลิงก์ตอน");
    setNewPlatform((prev) => ({
      ...prev,
      episodes: [...prev.episodes, newEpisode],
    }));
    setNewEpisode({ title: "", url: "" });
  };

  /* ==============================
            ฟังก์ชันตัวละคร
  ============================== */
  const addOrUpdateCharacter = () => {
    if (!newCharacter.name.trim()) return alert("กรุณากรอกชื่อตัวละคร");

    let updatedCharacters = [...(newAnime.characters || [])];
    if (editingCharacterId) {
      updatedCharacters = updatedCharacters.map((c) =>
        c.id === editingCharacterId ? { ...newCharacter, id: editingCharacterId } : c
      );
      alert("💾 บันทึกการแก้ไขตัวละครแล้ว");
    } else {
      updatedCharacters.push({ ...newCharacter, id: Date.now() });
      alert("✅ เพิ่มตัวละครเรียบร้อย");
    }

    setNewAnime({ ...newAnime, characters: updatedCharacters });
    setNewCharacter({ id: 0, name: "", role: "", image: "" });
    setEditingCharacterId(null);
  };

  const editCharacter = (id: number) => {
    const target = newAnime.characters?.find((c) => c.id === id);
    if (target) {
      setNewCharacter(target);
      setEditingCharacterId(id);
    }
  };

  const deleteCharacter = (id: number) => {
    if (!confirm("ลบตัวละครนี้หรือไม่?")) return;
    const updated = (newAnime.characters || []).filter((c) => c.id !== id);
    setNewAnime({ ...newAnime, characters: updated });
  };

  /* ==============================
           บันทึกข้อมูลอนิเมะ
  ============================== */
  const saveAnime = () => {
    if (!newAnime.title.trim()) return alert("กรุณากรอกชื่ออนิเมะ");

    if (editingId) {
      const updatedList = animeList.map((a) =>
        a.id === editingId ? { ...newAnime, id: editingId } : a
      );
      setAnimeList(updatedList);
      localStorage.setItem("animeList", JSON.stringify(updatedList));
      alert("✅ แก้ไขอนิเมะเรียบร้อย");
    } else {
      const updatedList = [...animeList, { ...newAnime, id: Date.now() }];
      setAnimeList(updatedList);
      localStorage.setItem("animeList", JSON.stringify(updatedList));
    }
    resetForm();
  };

  /* ==============================
                UI
  ============================== */
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "✏️ แก้ไขอนิเมะ" : "เพิ่มอนิเมะใหม่"}
      </h2>

      {/* ข้อมูลหลักของอนิเมะ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="p-2 rounded bg-gray-700" placeholder="ชื่ออนิเมะ"
          value={newAnime.title} onChange={(e) => handleChange("title", e.target.value)} />
        <input className="p-2 rounded bg-gray-700" type="number" placeholder="ปีที่ออกฉาย"
          value={newAnime.year} onChange={(e) => handleChange("year", Number(e.target.value))} />
        <select className="p-2 rounded bg-gray-700"
          value={newAnime.genre} onChange={(e) => handleChange("genre", e.target.value)}>
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select className="p-2 rounded bg-gray-700"
          value={newAnime.season} onChange={(e) => handleChange("season", e.target.value)}>
          {SEASONS.map((s) => <option key={s}>{s}</option>)}
        </select>
        <input className="p-2 rounded bg-gray-700" type="number" step="0.1"
          placeholder="คะแนน (0–10)"
          value={newAnime.rating === 0 ? "" : newAnime.rating}
          onChange={(e) => handleChange("rating", Number(e.target.value))} />
        <select className="p-2 rounded bg-gray-700"
          value={newAnime.broadcastDay}
          onChange={(e) => handleChange("broadcastDay", e.target.value)}>
          {BROADCAST_DAYS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <input className="p-2 rounded bg-gray-700 col-span-full"
          placeholder="ลิงก์รูปภาพ"
          value={newAnime.image} onChange={(e) => handleChange("image", e.target.value)} />
        <input className="p-2 rounded bg-gray-700 col-span-full"
          placeholder="ลิงก์ตัวอย่างวิดีโอ (trailerUrl)"
          value={newAnime.trailerUrl}
          onChange={(e) => handleChange("trailerUrl", e.target.value)} />
        <textarea className="p-2 rounded bg-gray-700 col-span-full"
          placeholder="คำอธิบาย"
          value={newAnime.description}
          onChange={(e) => handleChange("description", e.target.value)} />
      </div>

      {/* =====================
            Platform Section
      ===================== */}
      {newAnime.platforms.length > 0 && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-300 mb-2">🧩 แพลตฟอร์มที่มีอยู่</h3>
          {newAnime.platforms.map((p, i) => (
            <div key={i} className="bg-gray-800 p-3 rounded mb-3">
              <div className="flex justify-between items-center">
                <input className="text-black p-1 rounded w-2/3"
                  value={p.name}
                  onChange={(e) => {
                    const updated = [...(newAnime.platforms || [])];
                    updated[i].name = e.target.value;
                    setNewAnime({ ...newAnime, platforms: updated });
                  }}
                />
                <button onClick={() => deletePlatform(i)} className="text-red-400 hover:text-red-600 text-sm">
                  ✕ ลบ
                </button>
              </div>

              {p.episodes?.map((ep, j) => (
                <div key={j} className="flex items-center gap-2 mt-2">
                  <input className="text-black p-1 rounded w-1/3"
                    placeholder="ชื่อตอน" value={ep.title}
                    onChange={(e) => {
                      const updated = [...(newAnime.platforms || [])];
                      updated[i].episodes[j].title = e.target.value;
                      setNewAnime({ ...newAnime, platforms: updated });
                    }} />
                  <input className="text-black p-1 rounded w-1/2"
                    placeholder="ลิงก์ตอน" value={ep.url}
                    onChange={(e) => {
                      const updated = [...(newAnime.platforms || [])];
                      updated[i].episodes[j].url = e.target.value;
                      setNewAnime({ ...newAnime, platforms: updated });
                    }} />
                  <a href={ep.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">▶</a>
                  <button onClick={() => deleteEpisode(i, j)} className="text-red-400 hover:text-red-600">✕</button>
                </div>
              ))}

              <button onClick={() => addEpisodeToExistingPlatform(i)} className="text-green-400 hover:text-green-600 mt-2 text-sm">
                + เพิ่มตอน
              </button>
            </div>
          ))}
        </div>
      )}

      {/* =====================
              เพิ่ม Platform
      ===================== */}
      <div className="mt-6 bg-gray-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">➕ เพิ่มแพลตฟอร์มใหม่</h3>
        <select className="p-2 rounded bg-gray-800 w-full mb-2"
          value={newPlatform.name}
          onChange={(e) => setNewPlatform((p) => ({ ...p, name: e.target.value }))}>
          <option value="">เลือกแพลตฟอร์ม</option>
          {PLATFORM_OPTIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        {newPlatform.name === "กำหนดเอง" && (
          <input className="p-2 rounded bg-gray-800 w-full mb-2"
            placeholder="ชื่อแพลตฟอร์มเอง"
            value={newPlatform.customName}
            onChange={(e) => setNewPlatform((p) => ({ ...p, customName: e.target.value }))} />
        )}

        <div className="bg-gray-800 p-3 rounded mb-3">
          <input className="p-2 rounded bg-gray-700 w-full mb-2"
            placeholder="ชื่อตอน" value={newEpisode.title}
            onChange={(e) => setNewEpisode((ep) => ({ ...ep, title: e.target.value }))} />
          <input className="p-2 rounded bg-gray-700 w-full mb-2"
            placeholder="ลิงก์ตอน" value={newEpisode.url}
            onChange={(e) => setNewEpisode((ep) => ({ ...ep, url: e.target.value }))} />
          <button onClick={addEpisodeToNewPlatform} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
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

        <button onClick={addPlatform} className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded">
          ✅ เพิ่มแพลตฟอร์มนี้
        </button>
      </div>

      {/* =====================
              ส่วนตัวละคร
      ===================== */}
      <div className="mt-6 bg-gray-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">ตัวละคร</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
          <input className="p-2 rounded bg-gray-800"
            placeholder="ชื่อตัวละคร"
            value={newCharacter.name}
            onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })} />
          <input className="p-2 rounded bg-gray-800"
            placeholder="บทบาท (เช่น พระเอก, เพื่อน, ศัตรู)"
            value={newCharacter.role}
            onChange={(e) => setNewCharacter({ ...newCharacter, role: e.target.value })} />
          <input className="p-2 rounded bg-gray-800"
            placeholder="ลิงก์รูปภาพ"
            value={newCharacter.image}
            onChange={(e) => setNewCharacter({ ...newCharacter, image: e.target.value })} />
        </div>

        <button
          onClick={addOrUpdateCharacter}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          {editingCharacterId ? "💾 บันทึกตัวละคร" : "➕ เพิ่มตัวละคร"}
        </button>

        {(newAnime.characters && newAnime.characters.length > 0) && (
        <ul className="mt-4 space-y-2">
          {newAnime.characters.map((c) => (
            <li key={c.id} className="bg-gray-800 p-2 rounded flex justify-between items-center">
              <div>
                <strong>{c.name}</strong> — {c.role}
              </div>
              <div className="space-x-2">
                <button onClick={() => editCharacter(c.id)} className="text-yellow-400 hover:text-yellow-600">แก้ไข</button>
                <button onClick={() => deleteCharacter(c.id)} className="text-red-400 hover:text-red-600">ลบ</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      </div>

      {/* =====================
               ปุ่มบันทึก
      ===================== */}
      <div className="mt-6">
        <button onClick={saveAnime} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium">
          {editingId ? "💾 บันทึกการแก้ไข" : "✅ เพิ่มอนิเมะ"}
        </button>

        {editingId && (
          <button onClick={resetForm} className="mt-4 ml-3 bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md font-medium">
            ❌ ยกเลิก
          </button>
        )}
      </div>
    </div>
  );
}
