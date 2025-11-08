import { useState, useEffect } from "react";
import type { Anime } from "../types/anime";
import Tag from "../components/Tag";

interface DetailProps {
  // ข้อมูลอนิเมะเรื่องที่ถูกเลือกส่งมาจาก App.tsx
  anime: Anime;
  // ฟังก์ชันสำหรับย้อนกลับรับมาจาก App.tsx
  goBack: () => void;
  // ฟังก์ชันสำหรับเพิ่ม/ลบ รายการโปรดที่รับมาจาก App.tsx
  toggleFavorite: (anime: Anime) => void;
}

export default function Detail({ anime, goBack, toggleFavorite }: DetailProps) {
  // สถานะ State สำหรับเก็บข้อมูลอนิเมะที่แสดงในหน้านี้
  // โดยคัดลอก prop 'anime' มาใส่ state เพื่อให้สามารถอัปเดต 'isFavorite' ใน UI ได้ทันที
  const [currentAnime, setCurrentAnime] = useState(anime);
  // สถานะสำหรับเก็บแท็บที่กำลังเปิดอยู่ (overview, watch, characters)
  const [activeTab, setActiveTab] = useState<"overview" | "watch" | "characters">("overview");
  // สถานะสำหรับเก็บแพลตฟอร์มที่ผู้ใช้เลือกในแท็บ "การรับชม"
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Hook นี้จะทำงานเมื่อ 'anime' prop ข้อมูลจากตัวแม่ เปลี่ยนแปลง
  useEffect(() => {
    // อัปเดตสถานะ 'currentAnime' ภายใน ให้ตรงกับ prop ที่เข้ามาใหม่
    setCurrentAnime(anime);
  }, [anime]); // ทำงานเมื่อ 'anime' prop เปลี่ยนไป

  // Hook นี้จะทำงานเมื่อข้อมูลอนิเมะเปลี่ยน หรือ แพลตฟอร์มที่เลือกเปลี่ยน
  useEffect(() => {
    // ถ้ามีข้อมูลแพลตฟอร์ม และยังไม่มีแพลตฟอร์มใดถูกเลือก
    if (currentAnime.platforms && currentAnime.platforms.length > 0 && !selectedPlatform) {
      // ให้เลือกแพลตฟอร์มแรกในรายการเป็นค่าเริ่มต้น
      setSelectedPlatform(currentAnime.platforms[0].name);
    }
  }, [currentAnime, selectedPlatform]); // ทำงานเมื่อ 'currentAnime' หรือ 'selectedPlatform' เปลี่ยน


  // ฟังก์ชันจัดการการกดปุ่ม "Add/Remove from My List"
  const handleToggle = () => {
    // เรียกฟังก์ชัน 'toggleFavorite' ที่ส่งมาจาก App.tsx เพื่ออัปเดต State หลัก (และ localStorage)
    toggleFavorite(currentAnime);
    // อัปเดต State ภายใน (currentAnime) ทันที เพื่อให้ UI (ปุ่ม) เปลี่ยนแปลงทันที
    setCurrentAnime((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  // URL โลโก้ของแพลตฟอร์มต่างๆ
  const platformLogos: Record<string, string> = {
    Netflix: "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
    Crunchyroll: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfQX7B766poqHirN-xz6-W5xK1X4tv9F2oQ&s",
    "Muse Thailand":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfG5uBcdcUA7q1c5HX2fqc6c89Yb2q06ME0bWhDKypmcLrYgDMV_c9b6UxbEPjabw35Sc&usqp=CAU",
    "Disney+ Hotstar":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_OjHKHLZ52s4pHJ2JibF_CqU5OwjSyGTUWQ&s"
  };

  // ==============================
  //              UI
  // ==============================

  return (
    <div className="text-white">
      {/* ปุ่มย้อนกลับ */}
      <button onClick={goBack} className="text-blue-400 mb-4 hover:underline">
        ← Back
      </button>

      {/* ข้อมูลหลักของอนิเมะ (ส่วนหัว) */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* รูปภาพอนิเมะ */}
        <img
          src={currentAnime.image}
          alt={currentAnime.title}
          className="w-full md:w-64 rounded-lg shadow-lg"
        />

        {/* รายละเอียด (ชื่อ, ปี, แท็ก, คำอธิบาย) */}
        <div>
          <h1 className="text-3xl font-bold">{currentAnime.title}</h1>
          <p className="text-gray-400">{currentAnime.year}</p>

          {/* แสดง Tag โดยใช้คอมโพเนนต์ Tag.tsx */}
          <div className="flex gap-2 mt-2 flex-wrap">
            <Tag label={currentAnime.genre} color="#10b981" />
            <Tag label={`⭐ ${currentAnime.rating}`} color="#f59e0b" />
            {currentAnime.season && <Tag label={currentAnime.season} color="#3b82f6" />}
          </div>

          <p className="mt-4 text-gray-300">{currentAnime.description}</p>

          {/* ปุ่ม Add/Remove to My List */}
          <button
            onClick={handleToggle}
            // เปลี่ยนสีปุ่มตามสถานะ 'isFavorite'
            className={`mt-6 px-4 py-2 rounded-md font-medium transition ${
              currentAnime.isFavorite
                ? "bg-red-600 hover:bg-red-700" // สีแดง ถ้าอยู่ใน My List
                : "bg-blue-600 hover:bg-blue-700" // สีน้ำเงิน ถ้ายังไม่อยู่
            }`}
          >
            {/* เปลี่ยนข้อความปุ่มตามสถานะ 'isFavorite' */}
            {currentAnime.isFavorite ? "Remove from My List" : "Add to My List"}
          </button>
        </div>
      </div>

      {/* ส่วนแท็บนำทาง (Tab Navigation) */}
      <div className="mt-8 border-b border-gray-700 flex gap-6 text-lg font-medium">
        {/* แท็บ "ตัวอย่างอนิเมะ" */}
        <button
          // Tailwind เปลี่ยนสไตล์ตาม activeTab
          className={`pb-2 ${
            activeTab === "overview" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("overview")} // คลิกเพื่อตั้งค่าแท็บ
        >
          ตัวอย่างอนิเมะ
        </button>

        {/* แท็บ "การรับชม" */}
        <button
          className={`pb-2 ${
            activeTab === "watch" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("watch")}
        >
          การรับชม
        </button>

        {/* แท็บ "ตัวละคร" */}
        <button
          className={`pb-2 ${
            activeTab === "characters" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("characters")}
        >
          ตัวละคร
        </button>
      </div>

      {/* เนื้อหาในแต่ละแท็บ */}
      <div className="mt-6">
        {/* แท็บตัวอย่างอนิเมะ แสดงเมื่อ activeTab === "overview" */}
        {activeTab === "overview" && (
          <div>
            {/* ตรวจสอบว่ามี trailerUrl หรือไม่ */}
            {currentAnime.trailerUrl ? (
              // ถ้ามี แสดง iframe ของวิดีโอ
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={currentAnime.trailerUrl}
                  title="Trailer"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              // ถ้าไม่มี แสดงข้อความ
              <p className="text-gray-400 mt-2">ไม่มีวิดีโอตัวอย่าง</p>
            )}
          </div>
        )}

        {/* แท็บการรับชม แสดงเมื่อ activeTab === "watch" */}
        {activeTab === "watch" && (
          <div className="mt-4">
            {/* ตรวจสอบว่ามีข้อมูลแพลตฟอร์มหรือไม่ */}
            {currentAnime.platforms?.length ? (
              <>
                {/* ปุ่มเลือกแพลตฟอร์ม */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {currentAnime.platforms.map((p) => {
                    // สร้างตัวแปร logo
                    // พยายามใช้ 'p.logoUrl' (ที่กรอกใน Admin Form) ก่อน
                    // ถ้าไม่มี (||) ค่อยไปใช้ 'platformLogos[p.name]'
                    const logo = p.logoUrl || platformLogos[p.name];
                    // return JSX ของปุ่ม
                    return (
                      <button
                      key={p.name}
                      onClick={() =>
                        setSelectedPlatform(selectedPlatform === p.name ? null : p.name)
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition border shadow-sm ${
                        selectedPlatform === p.name
                          ? "bg-blue-600 border-blue-400"
                          : "bg-[#2b2d3e] border-transparent hover:bg-[#3c4060]"
                      }`}>

                      {/* ใช้ตัวแปร 'logo' ที่เราสร้างขึ้นมาแสดงผล */}
                      {logo && ( // ตรวจสอบว่า 'logo' มีค่า ไม่เป็น null/undefined/empty string
                        <img src={logo} alt={p.name} className="w-6 h-6 object-contain" /> // object-contain ป้องกันรูปสเกลเพี้ยน
                      )}
                      {/* แสดงชื่อแพลตฟอร์มและจำนวนตอน */}
                      <span className="font-medium text-blue-300">
                        {p.name}{" "}
                        {p.episodes?.length ? (
                          <span className="text-gray-300 text-sm">
                            ({p.episodes.length} ตอน)
                          </span>
                        ) : ("")}
                      </span>
                    </button>
                  );
                  })}
                  </div>

                {/* แสดงตอนของแพลตฟอร์มที่เลือก */}
                {selectedPlatform ? (
                  // IIFE (Immediately Invoked Function Expression) จัดการ logic การแสดงผล
                  (() => {
                    // ค้นหา Object แพลตฟอร์มที่ตรงกับชื่อที่เลือก
                    const selected = currentAnime.platforms.find(
                      (p) => p.name === selectedPlatform
                    );
                    // ตรวจสอบว่ามีข้อมูลตอนหรือไม่
                    return selected?.episodes?.length ? (
                      // ถ้ามี: วนลูปแสดงรายการตอน
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selected.episodes.map((ep, i) => (
                          <a
                            key={i}
                            href={ep.url} // ลิงก์ไปยังตอน
                            target="_blank" // เปิดในแท็บใหม่
                            rel="noopener noreferrer"
                            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition flex flex-col shadow"
                          >
                            {/* แสดง Thumbnail ของตอนถ้ามี */}
                            {ep.thumbnail && (
                              <img
                                src={ep.thumbnail}
                                alt={ep.title}
                                className="w-full h-40 object-cover rounded-md mb-2"
                              />
                            )}
                            <h4 className="font-semibold text-blue-300 mb-1">
                              ตอนที่ {i + 1}: {ep.title}
                            </h4>
                            <p className="text-sm text-gray-400 line-clamp-2">{ep.description}</p>
                          </a>
                        ))}
                      </div>
                    ) : (
                      // ถ้าไม่มีข้อมูลตอน
                      <p className="text-gray-400 text-center">
                        ไม่มีข้อมูลตอนสำหรับ {selectedPlatform}
                      </p>
                    );
                  })()
                ) : (
                  // ถ้ายังไม่ได้เลือกแพลตฟอร์ม
                  <p className="text-gray-400 text-center">เลือกแพลตฟอร์มเพื่อดูตอน</p>
                )}
              </>
            ) : (
              // ถ้าไม่มีข้อมูลแพลตฟอร์มเลย
              <p className="text-gray-400 text-center mt-4">ไม่มีข้อมูลการรับชม</p>
            )}
          </div>
        )}


        {/* แท็บตัวละครแสดงเมื่อ activeTab === "characters" */}
        {activeTab === "characters" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* ตรวจสอบว่ามีข้อมูลตัวละครหรือไม่ */}
            {currentAnime.characters?.length ? (
              // ถ้ามีวนลูปแสดงการ์ดตัวละคร
              currentAnime.characters.map((ch) => (
                <div
                  key={ch.name}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-105 transform transition"
                >
                  <img src={ch.image} alt={ch.name} className="w-full h-48 object-cover" />
                  <div className="p-2">
                    <h3 className="text-lg font-semibold">{ch.name}</h3>
                    <p className="text-gray-400 text-sm">{ch.role}</p>
                  </div>
                </div>
              ))
            ) : (
              // ถ้าไม่มีข้อมูลตัวละคร
              <p className="text-gray-400">ไม่มีข้อมูลตัวละคร</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}