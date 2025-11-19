import React, { useState } from "react";
import type { Anime, Platform, Episode } from "../types/anime";

interface PlatformManagerProps {
  // ข้อมูลอนิเมะปัจจุบันที่กำลังถูกแก้ไข
  anime: Anime;
  // ฟังก์ชันสำหรับอัปเดตข้อมูลอนิเมะในคอมโพเนนต์แม่
  setAnime: React.Dispatch<React.SetStateAction<Anime>>;
  // รายชื่อตัวเลือกแพลตฟอร์มที่กำหนดไว้ล่วงหน้า
  platformOptions: string[];
}

export default function PlatformManager({
  anime,
  setAnime,
  platformOptions,
}: PlatformManagerProps) {
  // สถานะสำหรับเก็บข้อมูลแพลตฟอร์มใหม่ที่กำลังกรอกหรือกำลังแก้ไข
  const [newPlatform, setNewPlatform] = useState<Platform>({
    name: "",
    episodes: [],
  });

  // สถานะสำหรับเก็บชื่อแพลตฟอร์มที่กำลังอยู่ในโหมดแก้ไข (null ถ้าเป็นการเพิ่มใหม่)
  const [editingPlatform, setEditingPlatform] = useState<string | null>(null);

  // สถานะสำหรับเก็บข้อมูลตอนใหม่ที่กำลังกรอก
  const [newEpisode, setNewEpisode] = useState<Episode>({
    id: Date.now(), // กำหนด ID เริ่มต้น
    number: 1,      // กำหนดหมายเลขตอนเริ่มต้น
    title: "",
    url: "",
    description: "",
    thumbnail: "",
  });

  // เพิ่มหรืออัปเดต Platform โดยบันทึก newPlatform เข้าสู่ anime.platforms
  const addOrUpdatePlatform = () => {
    if (!newPlatform.name.trim()) return alert("กรุณาเลือกหรือใส่ชื่อแพลตฟอร์ม");

    setAnime((prev) => {
      // ตรวจสอบว่ามีแพลตฟอร์มชื่อนี้อยู่แล้วหรือไม่
      const exists = prev.platforms.some((p) => p.name === newPlatform.name);
      if (exists) {
        // ถ้ามีอยู่แล้วเข้าสู่โหมดแก้ไข (Update)
        return {
          ...prev,
          platforms: prev.platforms.map((p) =>
            // ค้นหาแพลตฟอร์มที่ชื่อตรงกันและแทนที่ด้วย newPlatform
            p.name === newPlatform.name ? newPlatform : p
          ),
        };
      } else {
        // ถ้าไม่มีเข้าสู่โหมดเพิ่มใหม่ (Add)
        return { ...prev, platforms: [...prev.platforms, newPlatform] };
      }
    });
    // รีเซ็ตฟอร์มหลังจากเพิ่ม/แก้ไขเสร็จ
    resetPlatformForm();
  };

  // เพิ่มตอนบันทึก newEpisode เข้าสู่ newPlatform.episodes ชั่วคราว
  const addEpisode = () => {
    if (!newEpisode.title.trim() || !newEpisode.url.trim())
      return alert("กรุณากรอกชื่อตอนและลิงก์ตอน");

    // อัปเดตสถานะ newPlatform โดยเพิ่มตอนใหม่เข้าไป
    setNewPlatform((prev) => ({
      ...prev,
      episodes: [...prev.episodes, { ...newEpisode, id: Date.now() }],
    }));

    // รีเซ็ตสถานะ newEpisode และเพิ่มหมายเลขตอนสำหรับตอนถัดไป
    setNewEpisode({
      id: Date.now(),
      number: newEpisode.number + 1,
      title: "",
      url: "",
      description: "",
      thumbnail: "",
    });
  };

  //  ลบตอนออกจาก newPlatform.episodes ชั่วคราว
  const deleteEpisode = (id: number) => {
    setNewPlatform((prev) => ({
      ...prev,
      episodes: prev.episodes.filter((e) => e.id !== id),
    }));
  };

  //  แก้ไขแพลตฟอร์ม โดยโหลดข้อมูลแพลตฟอร์มที่มีอยู่เข้าสู่ฟอร์ม
  const editPlatform = (platform: Platform) => {
    setEditingPlatform(platform.name);
    setNewPlatform(platform);
  };

  // ลบแพลตฟอร์มออกจาก anime.platforms ถาวร
  const deletePlatform = (name: string) => {
    if (!confirm(`ต้องการลบแพลตฟอร์ม "${name}" หรือไม่?`)) return;
    setAnime((prev) => ({
      ...prev,
      // ใช้ filter เพื่อไม่รวมแพลตฟอร์มที่มีชื่อตรงกัน
      platforms: prev.platforms.filter((p) => p.name !== name),
    }));
    // ถ้ากำลังแก้ไขแพลตฟอร์มที่ถูกลบ ให้รีเซ็ตฟอร์มด้วย
    if (editingPlatform === name) resetPlatformForm();
  };

  //  รีเซ็ตฟอร์ม โดยล้างข้อมูลฟอร์ม newPlatform และยกเลิกโหมดแก้ไข
  const resetPlatformForm = () => {
    setNewPlatform({ name: "", episodes: [] });
    setEditingPlatform(null);
  };

  // ==============================
  //              UI
  // ==============================

  return (
    <div className="bg-gray-900 p-4 rounded-lg mt-6">
      <h3 className="text-lg font-semibold text-blue-300 mb-3">
        🎬 การรับชม / Platform
      </h3>

      {/*  ฟอร์มเพิ่ม / แก้แพลตฟอร์ม */}
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

        {/* ส่วนจัดการรายการตอนของแพลตฟอร์มที่เลือก/กรอกอยู่ */}
        <div className="bg-gray-800 p-3 rounded">
          <h4 className="font-semibold mb-2">รายการตอน</h4>

          {/* แสดงรายการตอนที่มีอยู่ใน newPlatform ชั่วคราว */}
          {newPlatform.episodes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {newPlatform.episodes.map((ep) => (
                <div
                  key={ep.id}
                  className="bg-gray-700 rounded-lg overflow-hidden shadow-md relative"
                >
                  {/* ภาพ Thumbnail ของตอน (ถ้ามี) */}
                  {ep.thumbnail && (
                    <img
                      src={ep.thumbnail}
                      alt={ep.title}
                      className="w-full h-32 object-cover"
                    />
                  )}
                  <div className="p-2">
                    {/* ข้อมูลตอน */}
                    <p className="font-semibold text-sm">
                      EP {ep.number}: {ep.title}
                    </p>
                    {/* คำอธิบายตอน */}
                    {ep.description && (
                      <p className="text-xs text-gray-300">
                        {ep.description}
                      </p>
                    )}
                    {/* ลิงก์ตอน */}
                    <a
                      href={ep.url}
                      target="_blank"
                      className="text-blue-400 text-xs underline"
                    >
                      เปิดลิงก์
                    </a>
                    {/* ปุ่มลบตอนชั่วคราว */}
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

          {/* ฟอร์มสำหรับเพิ่มตอนใหม่ Input ต่างๆ */}
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
            {/* ปุ่มเพิ่มตอนเข้าสู่ newPlatform ชั่วคราว */}
            <button
              onClick={addEpisode}
              className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded text-sm"
            >
              ➕ เพิ่มตอน
            </button>
          </div>
        </div>

        {/* ปุ่มเพิ่ม/บันทึกแพลตฟอร์ม */}
        <div className="flex gap-2">
          <button
            onClick={addOrUpdatePlatform}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md text-sm"
          >
            {editingPlatform
              ? "💾 บันทึกการแก้ไขแพลตฟอร์ม"
              : "✅ เพิ่มแพลตฟอร์ม"}
          </button>
          {/* ปุ่มยกเลิก (แสดงเมื่ออยู่ในโหมดแก้ไข) */}
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

      {/*  รายการแพลตฟอร์มทั้งหมด */}
      {anime.platforms.length > 0 && (
        <div className="mt-4">
          <h4 className="text-blue-400 font-semibold mb-2">
            แพลตฟอร์มที่มีอยู่แล้ว
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
                  {/* ปุ่มแก้ไขโหลดข้อมูลแพลตฟอร์มเข้าสู่ฟอร์มด้านบน */}
                  <button
                    onClick={() => editPlatform(p)}
                    className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                  >
                    ✏️ แก้ไข
                  </button>
                  {/* ปุ่มลบแพลตฟอร์ม */}
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
