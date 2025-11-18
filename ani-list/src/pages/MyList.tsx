import type { Anime } from "../types/anime";
import AnimeCard from "../components/AnimeCard";

interface MyListProps {
  // รายการอนิเมะที่ผู้ใช้เพิ่มไว้ใน My List โดย component นี้รับลิสต์ที่กรองแล้วจาก App.tsx
  animeList: Anime[]; 
  // ฟังก์ชัน Callback เมื่อคลิกเลือกอนิเมะ (เพื่อไปหน้า Detail)
  onSelect: (anime: Anime) => void;
}

export default function MyList({ animeList, onSelect }: MyListProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-white">My List</h1>
      {/* ตรวจสอบว่ามีอนิเมะในรายการหรือไม่ */}
      {animeList.length === 0 ? (
        // ถ้าไม่มีแสดงข้อความว่า "ยังไม่มีอนิเมะใน My List"
        <p className="text-gray-400 text-center">ยังไม่มีอนิเมะใน My List</p>
      ) : (
        // ถ้ามี: แสดงตาราง Grid ของอนิเมะ
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {/* วนลูปแสดงผลอนิเมะแต่ละเรื่อง */}
          {animeList.map((anime) => (
            // card อนิเมะแต่ละอัน
            <div
              key={anime.id}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform"
              // เมื่อคลิกที่ card ให้เรียกฟังก์ชัน onSelect
              onClick={() => onSelect(anime)}
            >
              {/* รูปภาพปก */}
              <AnimeCard
                key={anime.id}
                anime={anime}
                onSelect={onSelect}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
