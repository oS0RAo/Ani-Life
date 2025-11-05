// import React, { useState } from "react";
// import PlatformManager from "../components/PlatformManager";
// import type { Anime } from "../types/anime";

// // ใช้สำหรับทดสอบ coomponent PlatformManager โดยสร้างข้อมูลอนิเมะจำลองขึ้นมาเองเพื่อทดสอบ
// export default function PlatformEditor() {
//   // สร้างข้อมูลอนิเมะจำลองด้วย useState เพื่อใช้ทดสอบการทำงานของ PlatformManager
//   const [anime, setAnime] = useState<Anime>({
//     id: Date.now(),
//     title: "Example Anime",
//     year: 2025,
//     genre: "Action",
//     rating: 9,
//     image: "",
//     description: "รายละเอียดตัวอย่างอนิเมะ",
//     platforms: [],
//     characters: [],
//   });

//   // กำหนดตัวเลือกแพลตฟอร์มที่จะส่งให้ PlatformManager
//   const platformOptions = ["Netflix", "Crunchyroll", "YouTube", "กำหนดเอง"];

//   return (
//     <div className="min-h-screen bg-gray-950 text-white p-6">
//       <h1 className="text-2xl font-bold mb-4 text-blue-400">
//         แก้ไขแพลตฟอร์มของ {anime.title}
//       </h1>

//       {/* แสดงผลคอมโพเนนต์ PlatformManager */}
//       <PlatformManager
//         // ส่ง State ข้อมูลอนิเมะจำลองเข้าไป
//         anime={anime}
//         // ส่งฟังก์ชัน setAnime เข้าไป เพื่อให้ PlatformManager
//         // สามารถอัปเดตข้อมูล State 'anime' ในหน้านี้ได้โดยตรง
//         setAnime={setAnime}
//         // ส่งตัวเลือกแพลตฟอร์มเข้าไป
//         platformOptions={platformOptions}
//       />

//       {/* ส่วนแสดงผลข้อมูลสำหรับใ้ในการ Debug */}
//       <div className="mt-8">
//         <h2 className="text-lg font-semibold mb-2">📦 ข้อมูลทั้งหมด</h2>
//         {/* <pre> ใช้แสดงข้อความแบบ pre-formatted 
//           JSON.stringify(anime, null, 2) เป็นการแปลง Object 'anime' เป็นข้อความ JSON ที่จัดรูปแบบ null, 2 = เยื้อง 2 ช่องไฟ
//           ทำให้เราเห็นข้อมูล State 'anime' ทั้งหมดแบบ Real-timeเมื่อเราแก้ไขข้อมูลใน PlatformManager ข้อมูลในกล่องนี้จะอัปเดตตามทันที
//         */}
//         <pre className="bg-gray-800 p-3 rounded text-sm overflow-auto">
//           {JSON.stringify(anime, null, 2)}
//         </pre>
//       </div>
//     </div>
//   );
// }
