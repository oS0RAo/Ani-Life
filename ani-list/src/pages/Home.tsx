import { useState } from "react";
import type { Anime } from "../types/anime";
import SeasonSelector from "../components/SeasonSelector";
import AnimeCard from "../components/AnimeCard";

interface HomeProps {
  animeList: Anime[];
  onSelect: (anime: Anime) => void;
}

export default function Home({ animeList, onSelect }: HomeProps) {
  // สถานะ State สำหรับเก็บฤดูกาลที่ถูกเลือกใน SeasonSelector
  // ค่าเริ่มต้นคือ "All" (แสดงทั้งหมด)
  const [selectedSeason, setSelectedSeason] = useState("All");

  //กรองรายการอนิเมะตามฤดูกาลที่เลือก
  const filtered =
    // ใช้ Ternary Operator ตรวจสอบถ้า selectedSeason เป็น "All"
    selectedSeason === "All"
      // ให้แสดง animeList ทั้งหมด
      ? animeList
      // ถ้าไม่ใช่ "All" เช่น "Winter", "Spring"
      // ให้กรอง filter animeList เฉพาะเรื่องที่ a.season ตรงกับ selectedSeason
      : animeList.filter((a) => a.season === selectedSeason);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-white">Anime List</h1>
      {/* ส่งฟังก์ชัน onSelect เข้าไป เมื่อ SeasonSelector ถูกคลิก 
          จะเรียกฟังก์ชันนี้พร้อมกับส่งค่าฤดูกาล (s) กลับมา
          จากนั้นเราใช้ setSelectedSeason(s) เพื่ออัปเดตสถานะ
      */}
      <SeasonSelector onSelect={(s) => setSelectedSeason(s)} />

      {/* ตารางแสดงผลอนิเมะที่ถูกกรองแล้ว */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* วนลูปแสดงผลเฉพาะรายการอนิเมะที่ผ่านการกรอง (filtered) */}
        {filtered.map((anime) => (
          // card อนิเมะแต่ละใบ
          <div
            key={anime.id}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform"
            // เมื่อคลิกที่ card ให้เรียกฟังก์ชัน onSelect ที่ได้รับมา
            onClick={() => onSelect(anime)}
          >
            {/* รูปภาพปก */}
            <AnimeCard // ⭐️ [แทนที่] ใช้ AnimeCard แทน Div เดิม
            key={anime.id}
            anime={anime}
            onSelect={onSelect}
          />
          </div>
        ))}

        {/*ข้อความกรณีไม่พบข้อมูล */}
        {/* แสดงข้อความนี้เมื่อรายการที่กรองแล้ว ถ้าไม่มีข้อมูล length === 0 */}
        {filtered.length === 0 && (
          <p className="text-gray-400 text-center col-span-full mt-6">
            ไม่มีอนิเมะในซีซันนี้
          </p>
        )}
      </div>
    </div>
  );
}