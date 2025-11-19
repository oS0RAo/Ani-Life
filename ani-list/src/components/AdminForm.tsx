import React, { useState } from "react";
import type { Anime } from "../types/anime";

interface AdminFormProps {
  // รายการอนิเมะทั้งหมด
  animeList: Anime[];
  // ฟังก์ชันสำหรับอัปเดตรายการอนิเมะ
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
  // ID ของอนิเมะที่กำลังแก้
  editingId: number | null;
  // ฟังก์ชันสำหรับตั้งค่า ID ของอนิเมะที่กำลังแก้ไข
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
  // สถานะข้อมูลอนิเมะที่กำลังกรอกในฟอร์ม
  newAnime: Anime;
  // ฟังก์ชันสำหรับอัปเดตสถานะข้อมูลอนิเมะในฟอร์ม
  setNewAnime: React.Dispatch<React.SetStateAction<Anime>>;
  // ฟังก์ชันสำหรับรีเซ็ตฟอร์ม โดยล้างข้อมูลที่กรอกและยกเลิกการแก้ไข
  resetForm: () => void;
}

// ------------------------------------
//          ข้อมูลที่เป็นค่าคงที่
// ------------------------------------

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

// ------------------------------------
//      Component ของ AdminForm
// ------------------------------------

export default function AdminForm({
  animeList, setAnimeList,
  editingId, setEditingId,
  newAnime, setNewAnime,
  resetForm,
}: AdminFormProps) {
  // ฟังก์ชั่นสำหรับสถานะสำหรับเก็บข้อมูลแพลตฟอร์มใหม่ที่กำลังจะถูกเพิ่ม
  const [newPlatform, setNewPlatform] = useState({
     name: "", 
     customName: "", 
     episodes: [] as any[],
     logoUrl: ""
    });
  // ฟังก์ชั่นสำหรับสถานะสำหรับเก็บข้อมูลตอนใหม่ที่กำลังจะถูกเพิ่มเข้าไปใน newPlatform ชั่วคราว
  const [newEpisode, setNewEpisode] = useState({ title: "", url: "" });

  // ฟังก์ชั่นสำหรับส่วนเก็บสถานะของข้อมูลตัวละครใหม่/ที่กำลังแก้ไข
  const [newCharacter, setNewCharacter] = useState({ id: 0, name: "", role: "", image: "" });
  // สถานะสำหรับเก็บ ID ของตัวละครที่กำลังแก้ไขอยู่ ถ้าเป็น null คือการเพิ่มใหม่
  const [editingCharacterId, setEditingCharacterId] = useState<number | null>(null);

  // ฟังก์ชั่นสำหรับอัปเดต Field ข้อมูลหลักของอนิเมะ
  const handleChange = (field: keyof Anime, value: any) => {
    // ส่วนนี้จะใช้ Spread Operator (...) สำหรับใช้ในการคัดลอกข้อมูลเดิมและอัปเดตเฉพาะ Field ที่ระบุ
    setNewAnime((prev) => ({ ...prev, [field]: value }));
  };

  //==============================
  //    ฟังก์ชัน Platform & Episode
  //==============================

  // ฟังก์ชันสำหรับเพิ่มแพลตฟอร์มที่กรอกเสร็จแล้วเข้าสู่ข้อมูลอนิเมะหลัก (newAnime)
  const addPlatform = () => {
    // กำหนดชื่อแพลตฟอร์ม ถ้าเลือก "กำหนดเอง" ให้ใช้ชื่อที่กรอกใน customName
    const name = newPlatform.name === "กำหนดเอง" ? newPlatform.customName : newPlatform.name;
    if (!name.trim()) return alert("กรุณากรอกชื่อแพลตฟอร์ม");
    // อัปเดต Array platforms ของ newAnime
    const updated = [...(newAnime.platforms || []), { ...newPlatform, name }];
    setNewAnime({ ...newAnime, platforms: updated });
    // รีเซ็ตสถานะของ newPlatform
    setNewPlatform({ name: "", customName: "", episodes: [] as any[], logoUrl: "" });
  };

  // ฟังก์ชันสำหรับเพิ่มตอนเข้าไปในแพลตฟอร์มที่มีอยู่แล้ว
  const addEpisodeToExistingPlatform = (platformIndex: number) => {
    const updatedPlatforms = [...(newAnime.platforms || [])];
    // เพิ่ม Object ตอนใหม่เข้าไปใน Array episodes ของแพลตฟอร์มที่เลือก
    updatedPlatforms[platformIndex].episodes.push({
      id: Date.now(),
      number: updatedPlatforms[platformIndex].episodes.length + 1,
      title: "",
      url: "",
    });
    setNewAnime({ ...newAnime, platforms: updatedPlatforms });
  };

  // ฟังก์ชันสำหรับลบแพลตฟอร์ม
  const deletePlatform = (i: number) => {
    const updated = [...(newAnime.platforms || [])];
    updated.splice(i, 1);
    setNewAnime({ ...newAnime, platforms: updated });
  };

  // ฟังก์ชันสำหรับลบตอน
  const deleteEpisode = (pi: number, ei: number) => {
    const updated = [...(newAnime.platforms || [])];
    updated[pi].episodes.splice(ei, 1);
    setNewAnime({ ...newAnime, platforms: updated });
  };

  // ฟังก์ชันสำหรับเพิ่มตอนใหม่เข้าสู่สถานะ newPlatform ชั่วคราว
  const addEpisodeToNewPlatform = () => {
    if (!newEpisode.title || !newEpisode.url)
      return alert("กรุณากรอกชื่อตอนและลิงก์ตอน");
    // อัปเดตสถานะ newPlatform
    setNewPlatform((prev) => ({
      ...prev,
      episodes: [...prev.episodes, newEpisode],
    }));
    // รีเซ็ตสถานะ newEpisode
    setNewEpisode({ title: "", url: "" });
  };

  // ==============================
  //          ฟังก์ชันตัวละคร
  // ==============================

  // ฟังก์ชันสำหรับเพิ่มหรืออัปเดตข้อมูลตัวละคร
  const addOrUpdateCharacter = () => {
    if (!newCharacter.name.trim()) return alert("กรุณากรอกชื่อตัวละคร");

    let updatedCharacters = [...(newAnime.characters || [])];
    if (editingCharacterId) {
      // ในโหมดแก้ไขค้นหาตัวละครด้วย ID แล้วอัปเดต
      updatedCharacters = updatedCharacters.map((c) =>
        c.id === editingCharacterId ? { ...newCharacter, id: editingCharacterId } : c);
      alert("💾 บันทึกการแก้ไขตัวละครแล้ว");
    } else {
      // เพิ่มตัวละครใหม่ด้วย ID ที่สร้างจาก Date.now()
      updatedCharacters.push({ ...newCharacter, id: Date.now() });
      alert("✅ เพิ่มตัวละครเรียบร้อย");
    }

    setNewAnime({ ...newAnime, characters: updatedCharacters });
    // รีเซ็ตสถานะฟอร์มตัวละคร
    setNewCharacter({ id: 0, name: "", role: "", image: "" });
    setEditingCharacterId(null);
  };

  // ฟังก์ชันสำหรับเริ่มโหมดแก้ไขตัวละคร
  const editCharacter = (id: number) => {
    const target = newAnime.characters?.find((c) => c.id === id);
    if (target) {
      // โหลดข้อมูลตัวละครเข้าสู่ฟอร์ม
      setNewCharacter(target);
      // ตั้งค่า ID เพื่อเข้าสู่โหมดแก้ไข
      setEditingCharacterId(id);
    }
  };

  // ฟังก์ชันสำหรับลบตัวละคร
  const deleteCharacter = (id: number) => {
    if (!confirm("ลบตัวละครนี้หรือไม่?")) return;
    // ใช้ filter เพื่อสร้าง Array ใหม่ที่ไม่รวมตัวละครที่มี ID ตรงกัน
    const updated = (newAnime.characters || []).filter((c) => c.id !== id);
    setNewAnime({ ...newAnime, characters: updated });
  };

  // ==============================
  //       บันทึกข้อมูลอนิเมะ
  // ==============================
  const saveAnime = () => {
    if (!newAnime.title.trim()) return alert("กรุณากรอกชื่ออนิเมะ");

    if (editingId) {
      // อัปเดตรายการอนิเมะหลักในanimeListโดยแทนที่ตัวเดิม
      const updatedList = animeList.map((a) =>
        a.id === editingId ? { ...newAnime, id: editingId } : a
      );
      setAnimeList(updatedList);
      // บันทึกรายการใหม่ลงใน Local Storage
      localStorage.setItem("animeList", JSON.stringify(updatedList));
      alert("✅ แก้ไขอนิเมะเรียบร้อย");
    } else {
      // เพิ่มอนิเมะใหม่เข้าในรายการพร้อมกำหนด ID
      const updatedList = [...animeList, { ...newAnime, id: Date.now() }];
      setAnimeList(updatedList);
      // บันทึกรายการใหม่ลงใน Local Storage
      localStorage.setItem("animeList", JSON.stringify(updatedList));
    }
    // รีเซ็ตฟอร์มหลังจากบันทึกเสร็จ
    resetForm();
  };

  // ==============================
  //              UI
  // ==============================

 return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">

      {/* ส่วนหัวแสดงสถานะ เพิ่ม/แก้ไข */}
      <h2 className="text-xl font-semibold mb-4">
        {editingId ? "✏️ แก้ไขอนิเมะ" : "เพิ่มอนิเมะใหม่"}
      </h2>

      {/* ข้อมูลหลักของอนิเมะ (Input ต่างๆ) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Input ชื่ออนิเมะ (ผูกค่ากับ newAnime.title และใช้ handleChange) */}
        <input className="p-2 rounded bg-gray-700" placeholder="ชื่ออนิเมะ"
          value={newAnime.title} onChange={(e) => handleChange("title", e.target.value)} />

        {/* Input ปีที่ออกฉาย */}
        <input className="p-2 rounded bg-gray-700" type="number" placeholder="ปีที่ออกฉาย"
          value={newAnime.year} onChange={(e) => handleChange("year", Number(e.target.value))} />

        {/* Dropdown แนวอนิเมะ */}
        <select className="p-2 rounded bg-gray-700"
          value={newAnime.genre} onChange={(e) => handleChange("genre", e.target.value)}>
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>

        {/* Dropdown ฤดูกาลที่ฉาย */}
        <select className="p-2 rounded bg-gray-700"
          value={newAnime.season} onChange={(e) => handleChange("season", e.target.value)}>
          {SEASONS.map((s) => <option key={s}>{s}</option>)}
        </select>

        {/* Input คะแนน */}
        <input className="p-2 rounded bg-gray-700" type="number" step="0.1"
          placeholder="คะแนน (0–10)"
          value={newAnime.rating === 0 ? "" : newAnime.rating}
          onChange={(e) => handleChange("rating", Number(e.target.value))} />

        {/* Dropdown วันที่ออกอากาศ */}
        <select className="p-2 rounded bg-gray-700"
          value={newAnime.broadcastDay}
          onChange={(e) => handleChange("broadcastDay", e.target.value)}>
          {BROADCAST_DAYS.map((d) => <option key={d}>{d}</option>)}
        </select>

        {/* Input ลิงก์รูปภาพ */}
        <input className="p-2 rounded bg-gray-700 col-span-full"
          placeholder="ลิงก์รูปภาพ"
          value={newAnime.image} onChange={(e) => handleChange("image", e.target.value)} />

        {/* Input ลิงก์ตัวอย่างวิดีโอ */}
        <input className="p-2 rounded bg-gray-700 col-span-full"
          placeholder="ลิงก์ตัวอย่างวิดีโอ (trailerUrl)"
          value={newAnime.trailerUrl}
          onChange={(e) => handleChange("trailerUrl", e.target.value)} />

        {/* Textarea คำอธิบาย */}
        <textarea className="p-2 rounded bg-gray-700 col-span-full"
          placeholder="คำอธิบาย"
          value={newAnime.description}
          onChange={(e) => handleChange("description", e.target.value)} />
      </div>

      {/* ============================
          Platform Section แสดงอันที่มีอยู่
          ============================ */}

      {/* แสดงส่วนนี้ถ้ามีแพลตฟอร์มแล้ว */}
      {newAnime.platforms.length > 0 && (
        <div className="mt-6 bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-300 mb-2">แพลตฟอร์มที่มีอยู่</h3>

          {/* วนลูปแสดงแต่ละแพลตฟอร์ม (p) */}
          {newAnime.platforms.map((p, i) => (
            <div key={i} className="bg-gray-800 p-3 rounded mb-3">
              <div className="flex justify-between items-center">

                {/* Input สำหรับแก้ไขชื่อแพลตฟอร์มที่มีอยู่ */}
                <input className="text-black p-1 rounded w-2/3"
                  value={p.name}
                  onChange={(e) => {

                    // อัปเดตชื่อแพลตฟอร์มโดยตรงใน newAnime
                    const updated = [...(newAnime.platforms || [])];
                    updated[i].name = e.target.value;
                    setNewAnime({ ...newAnime, platforms: updated });
                  }}
                />
                {/* ปุ่มลบแพลตฟอร์ม */}
                <button onClick={() => deletePlatform(i)} className="text-red-400 hover:text-red-600 text-sm">
                  ✕ ลบ
                </button>
              </div>

              {/* วนลูปแสดงแต่ละตอนในแพลตฟอร์มนี้ */}
              {p.episodes?.map((ep, j) => (
                <div key={j} className="flex items-center gap-2 mt-2">
                  {/* Input ชื่อตอน */}
                  <input className="text-black p-1 rounded w-1/3"
                    placeholder="ชื่อตอน" value={ep.title}
                    onChange={(e) => {
                      // อัปเดตชื่อตอนโดยตรง
                      const updated = [...(newAnime.platforms || [])];
                      updated[i].episodes[j].title = e.target.value;
                      setNewAnime({ ...newAnime, platforms: updated });
                    }} />

                  {/* Input ลิงก์ตอน */}
                  <input className="text-black p-1 rounded w-1/2"
                    placeholder="ลิงก์ตอน" value={ep.url}
                    onChange={(e) => {
                      // อัปเดตลิงก์ตอนโดยตรง
                      const updated = [...(newAnime.platforms || [])];
                      updated[i].episodes[j].url = e.target.value;
                      setNewAnime({ ...newAnime, platforms: updated });
                    }} />

                  {/* ปุ่มดูลิงก์ */}
                  <a href={ep.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">▶</a>
                  {/* ปุ่มลบตอน */}
                  <button onClick={() => deleteEpisode(i, j)} className="text-red-400 hover:text-red-600">✕</button>
                </div>
              ))}

              {/* ปุ่มเพิ่มตอนในแพลตฟอร์มที่มีอยู่แล้ว */}
              <button onClick={() => addEpisodeToExistingPlatform(i)} className="text-green-400 hover:text-green-600 mt-2 text-sm">
                + เพิ่มตอน
              </button>
            </div>
          ))}
        </div>
      )}

      {/* =====================
            เพิ่ม Platform ใหม่
          ===================== */}

      <div className="mt-6 bg-gray-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">➕ เพิ่มแพลตฟอร์มใหม่</h3>

        {/* Dropdown เลือกชื่อแพลตฟอร์ม (อัปเดตสถานะ newPlatform.name) */}
        <select className="p-2 rounded bg-gray-800 w-full mb-2"
          value={newPlatform.name}
          onChange={(e) => setNewPlatform((p) => ({ ...p, name: e.target.value }))}>
          <option value="">เลือกแพลตฟอร์ม</option>
          {PLATFORM_OPTIONS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        {/* Input สำหรับชื่อแพลตฟอร์มกำหนดเองโดยจะแสดงเมื่อเลือก "กำหนดเอง" */}
        {newPlatform.name === "กำหนดเอง" && (
          <input className="p-2 rounded bg-gray-800 w-full mb-2"
            placeholder="ชื่อแพลตฟอร์มเอง"
            value={newPlatform.customName}
            onChange={(e) => setNewPlatform((p) => ({ ...p, customName: e.target.value }))} />
        )}

        <input className="p-2 rounded bg-gray-800 w-full mb-2"
          placeholder="ลิงก์โลโก้ (URL)"
          value={newPlatform.logoUrl}
          onChange={(e) => setNewPlatform((p) => ({ ...p, logoUrl: e.target.value }))} 
        />

        {/* ฟอร์มย่อยสำหรับกรอกข้อมูลตอนที่จะเพิ่มเข้าในแพลตฟอร์มใหม่ */}
        <div className="bg-gray-800 p-3 rounded mb-3">
          <input className="p-2 rounded bg-gray-700 w-full mb-2"
            placeholder="ชื่อตอน" value={newEpisode.title}
            onChange={(e) => setNewEpisode((ep) => ({ ...ep, title: e.target.value }))} />
          <input className="p-2 rounded bg-gray-700 w-full mb-2"
            placeholder="ลิงก์ตอน" value={newEpisode.url}
            onChange={(e) => setNewEpisode((ep) => ({ ...ep, url: e.target.value }))} />

          {/* ปุ่มเพิ่มตอนเข้าสู่สถานะ newPlatform ชั่วคราว */}
          <button onClick={addEpisodeToNewPlatform} className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
            ➕ เพิ่มตอน
          </button>
        </div>

        {/* แสดงรายการตอนที่ถูกเพิ่มชั่วคราว */}
        {newPlatform.episodes.length > 0 && (
          <ul className="text-sm text-gray-300 mb-2">
            {newPlatform.episodes.map((ep, i) => (
              <li key={i}>• {ep.title}</li>
            ))}
          </ul>
        )}

        {/* ปุ่มยืนยันการเพิ่มแพลตฟอร์มทั้งหมดเข้าสู่ newAnime */}
        <button onClick={addPlatform} className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded">
          ✅ เพิ่มแพลตฟอร์มนี้
        </button>
      </div>

      {/* =====================
                ส่วนตัวละคร
          ===================== */}

      <div className="mt-6 bg-gray-700 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">ตัวละคร</h3>

        {/* Input สำหรับกรอก/แก้ไขข้อมูลตัวละคร */}
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

        {/* ปุ่มเพิ่ม/บันทึกตัวละครเปลี่ยนข้อความตาม editingCharacterId */}
        <button
          onClick={addOrUpdateCharacter}
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
        >
          {editingCharacterId ? "💾 บันทึกตัวละคร" : "➕ เพิ่มตัวละคร"}
        </button>

        {/* แสดงรายการตัวละครที่เพิ่มเข้ามาแล้ว */}
        {(newAnime.characters && newAnime.characters.length > 0) && (
          <ul className="mt-4 space-y-2">
            {newAnime.characters.map((c) => (
              <li key={c.id} className="bg-gray-800 p-2 rounded flex justify-between items-center">
                <div>
                  <strong>{c.name}</strong> — {c.role}
                </div>
                <div className="space-x-2">
                  {/* ปุ่มแก้ไขตัวละคร */}
                  <button onClick={() => editCharacter(c.id)} className="text-yellow-400 hover:text-yellow-600">แก้ไข</button>
                  {/* ปุ่มลบตัวละคร */}
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
        {/* ปุ่มบันทึก/เพิ่มอนิเมะ (เรียกใช้ saveAnime) */}
        <button onClick={saveAnime} className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium">
          {editingId ? "💾 บันทึกการแก้ไข" : "✅ เพิ่มอนิเมะ"}
        </button>

        {/* ปุ่มยกเลิก แสดงเฉพาะเมื่ออยู่ในโหมดแก้ไข */}
        {editingId && (
          <button onClick={resetForm} className="mt-4 ml-3 bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md font-medium">
            ❌ ยกเลิก
          </button>
        )}
      </div>
    </div>
  );
}