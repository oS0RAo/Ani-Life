import { useState } from "react";
import type { Anime } from "../types/anime";

interface BrowseProps {
  // รายการอนิเมะทั้งหมดที่ได้รับมาจากcompnentแม่
  animeList: Anime[];
  // ฟังก์ชัน Callback ที่จะถูกเรียกเมื่อผู้ใช้คลิกเลือกอนิเมะ
  // cmponentแม่จัดการการนำทางไปหน้า Detail
  onSelect: (anime: Anime) => void;
}
// Compnent Browse
export default function Browse({ animeList, onSelect }: BrowseProps) {
  // State สำหรับเก็บข้อความที่ผู้ใช้พิมพ์ในช่องค้นหา
  const [query, setQuery] = useState("");

  // กรองรายการอนิเมะตามข้อความในช่องค้นหา (query)
  // โดย Logic นี้จะทำงานใหม่ทุกครั้งที่ State `query` เปลี่ยนแปลง(ผู้ใช้พิมพ์)
  const filtered = animeList.filter((a) =>
    // แปลงชื่อเรื่องและข้อความค้นหาให้เป็นตัวพิมพ์เล็กทั้งหมดเพื่อเปรียบเทียบแบบ case-insensitive
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  // ==============================
  //              UI
  // ==============================

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-4">Browse Anime</h2>
      {/* ช่องค้นหา */}
      <input
        // ค่าที่แสดงในช่องค้นหาถูกควบคุมโดย State `query`
        value={query}
        // เมื่อมีการเปลี่ยนแปลงให้อัปเดต State `query`
        onChange={(e) => setQuery(e.target.value)}
        placeholder="ค้นหาอนิเม..."
        className="w-full mb-6 p-2 rounded bg-gray-800 text-white border border-gray-700"
      />
      {/* ตารางแสดงผลอนิเมะที่ถูกกรองแล้ว */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* วนลูปแสดงผลเฉพาะรายการอนิเมะที่ผ่านการกรอง filter */}
        {filtered.map((anime) => (
          // สร้างการ์ดแสดงผลสำหรับอนิเมะแต่ละเรื่อง
          <div
            key={anime.id} // Key สำหรับ React List Render
            // เมื่อคลิกที่ card ให้เรียกฟังก์ชัน onSelect ที่ได้รับมา
            onClick={() => onSelect(anime)}
            // เพิ่ม animation เมื่อนำเมาส์ไปชี้
            className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition cursor-pointer"
          >
            {/* รูปภาพปกอนิเมะ */}
            <img 
              src={anime.image} 
              alt={anime.title} 
              className="rounded-md mb-3 w-full h-60 object-cover" 
            />
            {/* ชื่อเรื่องอนิเมะ */}
            <h3 className="text-lg font-semibold">{anime.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
