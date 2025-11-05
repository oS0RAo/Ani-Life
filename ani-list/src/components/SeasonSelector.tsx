import React, { useState } from "react";

interface SeasonSelectorProps {
  // ฟังก์ชัน Callback ที่จะถูกเรียกเมื่อผู้ใช้เลือกฤดูกาลโดยจะส่งชื่อฤดูกาลที่ถูกเลือกกลับไปยังคอมโพเนนต์แม่
  onSelect: (season: string) => void;
}
// รายการตัวเลือกฤดูกาล และ All สำหรับแสดงทั้งหมด
const seasons = ["All", "Winter", "Spring", "Summer", "Fall"];

// ------------------------------------
//     component SeasonSelector
// ------------------------------------

const SeasonSelector: React.FC<SeasonSelectorProps> = ({ onSelect }) => {
  // สถานะ (State) ภายในสำหรับเก็บว่าตอนนี้กำลังเลือกฤดูกาลใดอยู่โดยค่าเริ่มต้นคือ "All"
  const [selected, setSelected] = useState("All");

  // ฟังก์ชันจัดการการเลือกฤดูกาล
  const handleSelect = (season: string) => {
    // อัปเดตสถานะเพื่อเปลี่ยนสีปุ่ม
    setSelected(season);
    // เรียกใช้ฟังก์ชัน onSelect ที่รับมาจาก Props เพื่อแจ้งให้ component แม่
    onSelect(season);
  };

  return (
    <div className="flex justify-center gap-3 my-4 flex-wrap">
      {/* วนลูปแสดงปุ่มสำหรับแต่ละฤดูกาล */}
      {seasons.map((season) => (
        <button
          key={season}
          onClick={() => handleSelect(season)}
          // กำหนด Tailwind แบบมีเงื่อนไข
          className={`px-4 py-2 rounded-lg font-medium transition text-sm
            ${
              // ถ้า season ที่วนลูปอยู่ตรงกับค่าใน selected (selected === season)
              selected === season
              // ปุ่มที่ถูกเลือกจะเป็นสีน้ำเงิน
                ? "bg-blue-600 text-white shadow-md"
                // ปุ่มที่ไม่ถูกเลือกจะเป็นสีเทา
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
        >
          {season}
        </button>
      ))}
    </div>
  );
};

export default SeasonSelector;
