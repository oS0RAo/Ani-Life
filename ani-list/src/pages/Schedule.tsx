import { useState } from "react";
import type { Anime } from "../types/anime";
import AnimeCard from "../components/AnimeCard";

interface ScheduleProps {
  // รายการอนิเมะทั้งหมดรับมาจาก App.tsx
  animeList: Anime[];
  // ฟังก์ชัน Callback เมื่อคลิกเลือกอนิเมะเพื่อไปหน้า Detail
  onSelect: (anime: Anime) => void;
}

// รายการสำหรับกรองวันออกอากาศ
const DAYS = [
  "ทั้งหมด",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
  "อาทิตย์",
];

//คำนวณฤดูกาลปัจจุบันโดยดูจากเดือนของระบบ
function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1; // getMonth() คืนค่า 0-11, จึง +1
  if (month <= 3) return "Winter"; // ม.ค. - มี.ค.
  if (month <= 6) return "Spring"; // เม.ย. - มิ.ย.
  if (month <= 9) return "Summer"; // ก.ค. - ก.ย.
  return "Fall"; // ต.ค. - ธ.ค.
}

export default function Schedule({ animeList, onSelect }: ScheduleProps) {
  // State สำหรับเก็บ "วันที่" ที่ผู้ใช้เลือก
  const [selectedDay, setSelectedDay] = useState("ทั้งหมด");// ค่าเริ่มต้นคือ "ทั้งหมด"
  // ดึงข้อมูลฤดูกาลและปีปัจจุบัน
  const currentSeason = getCurrentSeason();
  const currentYear = new Date().getFullYear();
  // กรอง 'animeList' ทั้งหมด ให้เหลือเฉพาะอนิเมะที่ตรงกับ "ฤดูกาลปัจจุบัน" และ "ปีปัจจุบัน"
  const currentSeasonAnime = animeList.filter(
    (a) => a.season === currentSeason && a.year === currentYear
  );
  // กรอง 'currentSeasonAnime' (ผลลัพธ์จาก 5.2) ตาม "วันที่เลือก" (selectedDay)
  const filteredAnime =
    // ถ้า selectedDay คือ "ทั้งหมด"
    selectedDay === "ทั้งหมด"
      // ให้ใช้ 'currentSeasonAnime' ทั้งหมด
      ? currentSeasonAnime
      // ถ้าไม่ใช่ "ทั้งหมด" (เช่น "จันทร์") ให้กรอง 'currentSeasonAnime' เฉพาะเรื่องที่ 'broadcastDay' ตรงกับ 'selectedDay'
      : currentSeasonAnime.filter((a) => a.broadcastDay === selectedDay);

  return (
    <div>
      {/* ส่วนหัวของหน้าแสดงฤดูกาลและปีปัจจุบัน */}
      <h1 className="text-3xl font-bold mb-4 text-white">
        ตารางออกอากาศ ({currentSeason} {currentYear})
      </h1>
      
      {/* ปุ่มกรองตามวัน */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {/* วนลูปแสดงปุ่มจาก Array 'DAYS' */}
        {DAYS.map((day) => (
          <button
            key={day}
            // เมื่อคลิก ให้ตั้งค่า 'selectedDay' เป็นวันนั้นๆ
            onClick={() => setSelectedDay(day)}
            // Tailwind เปลี่ยนสไตล์ปุ่มตาม 'selectedDay'
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              selectedDay === day
                ? "bg-blue-600 text-white" // สไตล์เมื่อถูกเลือก
                : "bg-gray-700 hover:bg-gray-600 text-gray-200" // สไตล์ปกติ
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* ตารางแสดงผลอนิเมะที่ถูกกรองแล้ว */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* วนลูป 'filteredAnime' (ผลลัพธ์สุดท้าย) เพื่อแสดง card */}
        {filteredAnime.map((anime) => (
          <div
            key={anime.id}
            className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition transform"
            // เมื่อคลิก ให้เรียกฟังก์ชัน onSelect
            onClick={() => onSelect(anime)}
          >
            <AnimeCard
              key={anime.id}
              anime={anime}
              onSelect={onSelect}
            />
          </div>
        ))}

        {/* ข้อความกรณีไม่พบข้อมูล */}
        {filteredAnime.length === 0 && (
          <p className="text-gray-400 text-center col-span-full mt-6">
            ไม่มีอนิเมะที่ฉายในวันนี้
          </p>
        )}
      </div>
    </div>
  );
}
