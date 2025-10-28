import React, { useState } from "react";
import PlatformManager from "../components/PlatformManager";
import type { Anime } from "../types/anime";

export default function PlatformEditor() {
  const [anime, setAnime] = useState<Anime>({
    id: Date.now(),
    title: "Example Anime",
    year: 2025,
    genre: "Action",
    rating: 9,
    image: "",
    description: "รายละเอียดตัวอย่างอนิเมะ",
    platforms: [],
    characters: [],
  });

  const platformOptions = ["Netflix", "Crunchyroll", "YouTube", "กำหนดเอง"];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-400">
        🧩 แก้ไขแพลตฟอร์มของ {anime.title}
      </h1>

      <PlatformManager
        anime={anime}
        setAnime={setAnime}
        platformOptions={platformOptions}
      />

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">📦 ข้อมูลทั้งหมด</h2>
        <pre className="bg-gray-800 p-3 rounded text-sm overflow-auto">
          {JSON.stringify(anime, null, 2)}
        </pre>
      </div>
    </div>
  );
}
