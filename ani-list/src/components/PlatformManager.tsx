import React, { useState } from "react";
import type { Anime, Platform, Episode } from "../types/anime";

interface PlatformManagerProps {
  anime: Anime;
  setAnime: React.Dispatch<React.SetStateAction<Anime>>;
  platformOptions: string[];
}

export default function PlatformManager({
  anime,
  setAnime,
  platformOptions,
}: PlatformManagerProps) {
  const [newPlatform, setNewPlatform] = useState<Platform>({
    name: "",
    episodes: [],
  });

  const [editingPlatform, setEditingPlatform] = useState<string | null>(null);
  const [newEpisode, setNewEpisode] = useState<Episode>({
    id: Date.now(),
    number: 1,
    title: "",
    url: "",
    description: "",
    thumbnail: "",
  });

  /** ✅ เพิ่มหรืออัปเดต Platform */
  const addOrUpdatePlatform = () => {
    if (!newPlatform.name.trim()) return alert("กรุณาเลือกหรือใส่ชื่อแพลตฟอร์ม");

    setAnime((prev) => {
      const exists = prev.platforms.some((p) => p.name === newPlatform.name);
      if (exists) {
        return {
          ...prev,
          platforms: prev.platforms.map((p) =>
            p.name === newPlatform.name ? newPlatform : p
          ),
        };
      } else {
        return { ...prev, platforms: [...prev.platforms, newPlatform] };
      }
    });

    resetPlatformForm();
  };

  /** ✅ เพิ่มตอน */
  const addEpisode = () => {
    if (!newEpisode.title.trim() || !newEpisode.url.trim())
      return alert("กรุณากรอกชื่อตอนและลิงก์ตอน");

    setNewPlatform((prev) => ({
      ...prev,
      episodes: [...prev.episodes, { ...newEpisode, id: Date.now() }],
    }));

    setNewEpisode({
      id: Date.now(),
      number: newEpisode.number + 1,
      title: "",
      url: "",
      description: "",
      thumbnail: "",
    });
  };

  /** ✅ ลบตอน */
  const deleteEpisode = (id: number) => {
    setNewPlatform((prev) => ({
      ...prev,
      episodes: prev.episodes.filter((e) => e.id !== id),
    }));
  };

  /** ✅ แก้ไขแพลตฟอร์ม */
  const editPlatform = (platform: Platform) => {
    setEditingPlatform(platform.name);
    setNewPlatform(platform);
  };

  /** ✅ ลบแพลตฟอร์ม */
  const deletePlatform = (name: string) => {
    if (!confirm(`ต้องการลบแพลตฟอร์ม "${name}" หรือไม่?`)) return;
    setAnime((prev) => ({
      ...prev,
      platforms: prev.platforms.filter((p) => p.name !== name),
    }));
    if (editingPlatform === name) resetPlatformForm();
  };

  /** ✅ รีเซ็ตฟอร์ม */
  const resetPlatformForm = () => {
    setNewPlatform({ name: "", episodes: [] });
    setEditingPlatform(null);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-6">
      <h3 className="text-lg font-semibold text-blue-300 mb-3">
        🎬 การรับชม / Platform
      </h3>

      {/* 🟢 ฟอร์มเพิ่ม / แก้แพลตฟอร์ม */}
      <div className="space-y-3 mb-4">
        <select
          value={newPlatform.name}
          onChange={(e) =>
            setNewPlatform({ ...newPlatform, name: e.target.value })
          }
          className="p-2 bg-gray-700 rounded w-full"
        >
          <option value="">เลือกแพลตฟอร์ม</option>
          {platformOptions.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        {/* ตอนของแพลตฟอร์ม */}
        <div className="bg-gray-800 p-3 rounded">
          <h4 className="font-semibold mb-2">📺 รายการตอน</h4>

          {newPlatform.episodes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {newPlatform.episodes.map((ep) => (
                <div
                  key={ep.id}
                  className="bg-gray-700 rounded-lg overflow-hidden shadow-md relative"
                >
                  {ep.thumbnail && (
                    <img
                      src={ep.thumbnail}
                      alt={ep.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-2">
                    <p className="font-semibold text-sm">
                      EP {ep.number}: {ep.title}
                    </p>
                    {ep.description && (
                      <p className="text-xs text-gray-300">
                        {ep.description}
                      </p>
                    )}
                    <a
                      href={ep.url}
                      target="_blank"
                      className="text-blue-400 text-xs underline"
                    >
                      เปิดลิงก์
                    </a>
                    <button
                      onClick={() => deleteEpisode(ep.id)}
                      className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-xs px-2 py-1 rounded"
                    >
                      ลบ
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🟡 เพิ่มตอนใหม่ */}
          <div className="grid grid-cols-1 gap-2">
            <input
              type="number"
              placeholder="ตอนที่"
              value={newEpisode.number}
              onChange={(e) =>
                setNewEpisode({
                  ...newEpisode,
                  number: Number(e.target.value),
                })
              }
              className="p-2 rounded bg-gray-700"
            />
            <input
              type="text"
              placeholder="ชื่อตอน"
              value={newEpisode.title}
              onChange={(e) =>
                setNewEpisode({ ...newEpisode, title: e.target.value })
              }
              className="p-2 rounded bg-gray-700"
            />
            <input
              type="text"
              placeholder="ลิงก์ตอน"
              value={newEpisode.url}
              onChange={(e) =>
                setNewEpisode({ ...newEpisode, url: e.target.value })
              }
              className="p-2 rounded bg-gray-700"
            />
            <input
              type="text"
              placeholder="ลิงก์ภาพ Thumbnail"
              value={newEpisode.thumbnail}
              onChange={(e) =>
                setNewEpisode({
                  ...newEpisode,
                  thumbnail: e.target.value,
                })
              }
              className="p-2 rounded bg-gray-700"
            />
            <textarea
              placeholder="คำอธิบายตอน"
              value={newEpisode.description}
              onChange={(e) =>
                setNewEpisode({
                  ...newEpisode,
                  description: e.target.value,
                })
              }
              className="p-2 rounded bg-gray-700"
            />
            <button
              onClick={addEpisode}
              className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm"
            >
              ➕ เพิ่มตอน
            </button>
          </div>
        </div>

        {/* ปุ่มเพิ่ม / บันทึกแพลตฟอร์ม */}
        <div className="flex gap-2">
          <button
            onClick={addOrUpdatePlatform}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm"
          >
            {editingPlatform
              ? "💾 บันทึกการแก้ไขแพลตฟอร์ม"
              : "✅ เพิ่มแพลตฟอร์ม"}
          </button>
          {editingPlatform && (
            <button
              onClick={resetPlatformForm}
              className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded-md text-sm"
            >
              ❌ ยกเลิก
            </button>
          )}
        </div>
      </div>

      {/* 🔵 รายการแพลตฟอร์มทั้งหมด */}
      {anime.platforms.length > 0 && (
        <div className="mt-4">
          <h4 className="text-blue-400 font-semibold mb-2">
            📦 แพลตฟอร์มที่มีอยู่แล้ว
          </h4>
          <div className="space-y-2">
            {anime.platforms.map((p) => (
              <div
                key={p.name}
                className="bg-gray-800 p-3 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-400">
                    ตอนทั้งหมด: {p.episodes.length}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editPlatform(p)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                  >
                    ✏️ แก้ไข
                  </button>
                  <button
                    onClick={() => deletePlatform(p.name)}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
