import { useState } from "react";
import type { Anime } from "../types/anime";
import SeasonSelector from "../components/SeasonSelector";
import AnimeCard from "../components/AnimeCard";

interface HomeProps {
  animeList: Anime[];
  onSelect: (anime: Anime) => void;
}

const GENRES = ["Action", "Adventure", "Comedy", "Drama", "Fantasy","Romance", "Sci-Fi", "Slice of Life", "Supernatural"];

export default function Home({ animeList, onSelect }: HomeProps) {
  // สถานะ State สำหรับเก็บฤดูกาลที่ถูกเลือกใน SeasonSelector
  // ค่าเริ่มต้นคือ "All" (แสดงทั้งหมด)
  const [selectedSeason, setSelectedSeason] = useState("All");
  // สถานะ State สำหรับเก็บแนวที่ถูกเลือกใน FilterGenre
  // ค่าเริ่มต้นคือ "All" (แสดงทั้งหมด)
  const [filterGenre, setFilterGenre] = useState("All");

  const filtered = animeList.filter((anime) => {
    //กรองรายการอนิเมะตามฤดูกาลที่เลือก
    const matchSeason =
      // ใช้ Ternary Operator ตรวจสอบถ้า selectedSeason เป็น "All"
      // ให้แสดง animeList ทั้งหมด
      // ถ้าไม่ใช่ "All" เช่น "Winter", "Spring"
      // ให้กรอง filter animeList เฉพาะเรื่องที่ a.season ตรงกับ selectedSeason
      selectedSeason === "All" || anime.season === selectedSeason;
      // ให้กรองแสดงตามแนวที่เลือก
      const matchGenre = filterGenre === "All" || anime.genre === filterGenre;
      return matchSeason && matchGenre;
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-white">Anime List</h1>
      {/* ส่งฟังก์ชัน onSelect เข้าไป เมื่อ SeasonSelector ถูกคลิก 
          จะเรียกฟังก์ชันนี้พร้อมกับส่งค่าฤดูกาล (s) กลับมา
          จากนั้นเราใช้ setSelectedSeason(s) เพื่ออัปเดตสถานะ
      */}
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
        <SeasonSelector onSelect={(s) => setSelectedSeason(s)} />
        {/* Dropdown กรองแนว (ผูกค่ากับ filterGenre) */}
        <select 
          className="p-2 rounded bg-gray-700 text-white"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        >
          <option value="All">ทุกแนว</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      
      {/* ตารางแสดงผลอนิเมะที่ถูกกรองแล้ว */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* วนลูปแสดงผลเฉพาะรายการอนิเมะที่ผ่านการกรอง (filtered) */}
        {filtered.map((anime) => (
          // card อนิเมะแต่ละใบ
          <div
            key={anime.id}
            // animation เมื่อนำเมาส์ไปชี้
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform"
            // เมื่อคลิกที่ card ให้เรียกฟังก์ชัน onSelect ที่ได้รับมา
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