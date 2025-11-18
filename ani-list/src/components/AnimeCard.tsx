import type { Anime } from "../types/anime";

interface Props {
  // ข้อมูลอนิเมะแต่ละเรื่องที่จะนำมาแสดงในการ์ด
  anime: Anime;
  // ฟังก์ชัน Callback ที่จะถูกเรียกเมื่อผู้ใช้คลิกที่การ์ด
  // โดยจะส่ง Object ข้อมูลอนิเมะกลับไปยังคอมโพเนนต์แม่
  onSelect: (anime: Anime) => void;
}

// ==============================
//              UI
// ==============================

export default function AnimeCard({ anime, onSelect }: Props) {
  return (
    // เมื่อมีการคลิก onClick จะเรียกใช้ฟังก์ชัน onSelect โดยส่งข้อมูลอนิเมะปัจจุบันเข้าไป
    <div onClick={() => onSelect(anime)} className="bg-gray-800 rounded-lg shadow cursor-pointer hover:scale-105 transition transform overflow-hidden">

      {/* ส่วนรูปภาพปกอนิเมะ */}
      <img 
        // รูปภาพดึงจาก anime.image
        src={anime.image} 
        // ข้อความ ดึงจาก anime.title
        alt={anime.title} 
        // ทำให้ขอบบนโค้งมน, กำหนดความสูงและความกว้าง, การครอบตัดรูปภาพ
        className="rounded-t-lg h-60 w-full object-cover" 
      />
      
      {/* ส่วนเนื้อหาของการ์ด */}
      <div className="p-2">
        {/* ชื่อเรื่องอนิเมะ */}
        <h2 className="font-semibold text-white">{anime.title}</h2>
        {/* แนว */}
        <p className="text-gray-400 text-sm">{anime.genre}</p>
        {/* คะแนน (Rating) */}
        <p className="text-yellow-600 font-medium mt-1"> ⭐ {anime.rating}</p>
        {/* ปีที่ออกฉาย */}
        <p className="text-sm text-gray-500">{anime.genre} • {anime.year}</p>
      </div>
    </div>
  );
}
