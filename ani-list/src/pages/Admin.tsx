import React, { useState } from "react";
import type { Anime } from "../types/anime";
import AdminForm from "../components/AdminForm";

// ใช้ซ้ำจาก AdminForm.tsx เพื่อสร้าง Dropdown สำหรับการกรอง
const SEASONS = ["Winter", "Spring", "Summer", "Fall"];
const GENRES = [
  "Action", "Adventure", "Comedy", "Drama", "Fantasy",
  "Romance", "Sci-Fi", "Slice of Life",
];
const BROADCAST_DAYS = [
  "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์",
];

// ------------------------------------
//          component Admin
// ------------------------------------

export default function Admin({ animeList, setAnimeList }: {
  // Props ที่รับมาจาก App.tsx
  animeList: Anime[]; 
  setAnimeList: React.Dispatch<React.SetStateAction<Anime[]>>;
}) {
  // สถานะสำหรับเก็บ ID ของอนิเมะที่กำลังแก้ไขอยู่ (ใช้ควบคุม AdminForm)
  const [editingId, setEditingId] = useState<number | null>(null);
  // สถานะสำหรับเก็บข้อความที่ใช้ค้นหา
  const [searchTerm, setSearchTerm] = useState("");
  // สถานะสำหรับเก็บตัวกรองแนว
  const [filterGenre, setFilterGenre] = useState("");
  // สถานะสำหรับเก็บตัวกรองฤดูกาล
  const [filterSeason, setFilterSeason] = useState("");
  // สถานะสำหรับเก็บตัวกรองวันออกอากาศ
  const [filterDay, setFilterDay] = useState("");

  // สถานะสำหรับเก็บข้อมูลอนิเมะที่กำลังจะเพิ่มใหม่/แก้ไข (ส่งเข้า AdminForm)
  const [newAnime, setNewAnime] = useState<Anime>({
    // กำหนดค่าเริ่มต้นสำหรับฟอร์มใหม่
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

  // ฟังก์ชันรีเซ็ตข้อมูลในฟอร์มให้กลับสู่ค่าเริ่มต้น
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
    // ยกเลิกโหมดแก้ไข
    setEditingId(null);
  };

  // ฟังก์ชันสำหรับเข้าสู่โหมดแก้ไข
  const editAnime = (anime: Anime) => {
    // โหลดข้อมูลอนิเมะเข้าสู่ฟอร์ม
    setNewAnime(anime);
    // ตั้งค่า ID เพื่อให้ฟอร์มแสดงเป็นโหมดแก้ไข
    setEditingId(anime.id);
    // เลื่อนหน้าจอไปด้านบนเพื่อให้เห็นฟอร์มทันที
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ฟังก์ชันสำหรับลบอนิเมะ
  const deleteAnime = (id: number) => {
    if (!confirm("ต้องการลบอนิเมะนี้หรือไม่?")) return;
    // ใช้ filter เพื่อสร้างรายการใหม่ที่ไม่รวมอนิเมะที่มี ID ตรงกัน
    const updated = animeList.filter((a) => a.id !== id);
    setAnimeList(updated);
    // บันทึกรายการใหม่ลงใน Local Storage (เพื่อให้ข้อมูลถูกบันทึกถาวร)
    localStorage.setItem("animeList", JSON.stringify(updated));
  };

  //กรองรายการอนิเมะตามเงื่อนไขการค้นหาและตัวกรองต่างๆ
  const filteredAnime = animeList.filter((anime) => {
    //ตรวจสอบการค้นหาด้วยชื่อ (แปลงเป็นตัวพิมพ์เล็กทั้งหมดเพื่อเปรียบเทียบ)
    const matchSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase());
    //ตรวจสอบการกรองแนว (ถ้า filterGenre เป็นค่าว่าง "" จะถือว่าตรงทั้งหมด)
    const matchGenre = !filterGenre || anime.genre === filterGenre;
    //ตรวจสอบการกรองฤดูกาล
    const matchSeason = !filterSeason || anime.season === filterSeason;
    //ตรวจสอบการกรองวันออกอากาศ
    const matchDay = !filterDay || anime.broadcastDay === filterDay;
    // คืนค่าเป็น true ก็ต่อเมื่อตรงตามทุกเงื่อนไข
    return matchSearch && matchGenre && matchSeason && matchDay;
  });

  // ==============================
  //              UI
  // ==============================
  
  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">⚙️ ระบบจัดการอนิเมะ</h1>

      {/* componentAdminForm ส่งสถานะและฟังก์ชันทั้งหมดที่จำเป็นสำหรับการเพิ่ม/แก้ไข/บันทึกฟอร์ม */}
      <AdminForm
        animeList={animeList}
        setAnimeList={setAnimeList}
        editingId={editingId}
        setEditingId={setEditingId}
        newAnime={newAnime}
        setNewAnime={setNewAnime}
        resetForm={resetForm}
      />

      {/*  ส่วนค้นหาและกรอง */}
      <div className="flex flex-wrap gap-3 mb-6 bg-gray-800 p-4 rounded-lg items-center">
        {/* Input ค้นหา (ผูกค่ากับ searchTerm) */}
        <input
          type="text"
          placeholder="🔍 ค้นหาชื่ออนิเมะ..."
          className="p-2 rounded bg-gray-700 flex-1 min-w-[200px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Dropdown กรองแนว (ผูกค่ากับ filterGenre) */}
        <select className="p-2 rounded bg-gray-700"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}>
          <option value="">All</option>
          {GENRES.map((g) => <option key={g}>{g}</option>)}
        </select>
        {/* Dropdown กรองฤดูกาล (ผูกค่ากับ filterSeason) */}
        <select className="p-2 rounded bg-gray-700"
          value={filterSeason}
          onChange={(e) => setFilterSeason(e.target.value)}>
          <option value="">All</option>
          {SEASONS.map((s) => <option key={s}>{s}</option>)}
        </select>
        {/* Dropdown กรองวันออกอากาศ (ผูกค่ากับ filterDay) */}
        <select className="p-2 rounded bg-gray-700"
          value={filterDay}
          onChange={(e) => setFilterDay(e.target.value)}>
          <option value="">All</option>
          {BROADCAST_DAYS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* รายการอนิเมะ */}
      <h2 className="text-xl font-semibold mb-3">รายการทั้งหมด ({filteredAnime.length})</h2>
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
              {/* ปุ่มจัดการ */}
              <div className="flex gap-2">
                {/* ปุ่มแก้ไข (เรียกใช้ editAnime) */}
                <button onClick={() => editAnime(anime)} className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm">✏️ แก้ไข</button>
                {/* ปุ่มลบ (เรียกใช้ deleteAnime) */}
                <button onClick={() => deleteAnime(anime.id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">🗑️ ลบ</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
