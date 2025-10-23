import { useState, useEffect } from "react";
import type { Anime } from "../types/anime";
import Tag from "../components/Tag";

interface DetailProps {
  anime: Anime;
  goBack: () => void;
  toggleFavorite: (anime: Anime) => void;
}

export default function Detail({ anime, goBack, toggleFavorite }: DetailProps) {
  const [currentAnime, setCurrentAnime] = useState(anime);
  const [activeTab, setActiveTab] = useState<"overview" | "watch" | "characters">("overview");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  useEffect(() => {
    setCurrentAnime(anime);
  }, [anime]);

  useEffect(() => {
  if (currentAnime.platforms && currentAnime.platforms.length > 0 && !selectedPlatform) {
      setSelectedPlatform(currentAnime.platforms[0].name);
    }
  }, [currentAnime, selectedPlatform]);


  const handleToggle = () => {
    toggleFavorite(currentAnime);
    setCurrentAnime((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  const platformLogos: Record<string, string> = {
    Netflix: "https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456",
    Crunchyroll: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROfQX7B766poqHirN-xz6-W5xK1X4tv9F2oQ&s",
    "Muse Thailand":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfG5uBcdcUA7q1c5HX2fqc6c89Yb2q06ME0bWhDKypmcLrYgDMV_c9b6UxbEPjabw35Sc&usqp=CAU",
    "Disney+ Hotstar":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_OjHKHLZ52s4pHJ2JibF_CqU5OwjSyGTUWQ&s"
  };

  return (
    <div className="text-white">
      {/* ปุ่มย้อนกลับ */}
      <button onClick={goBack} className="text-blue-400 mb-4 hover:underline">
        ← Back
      </button>

      {/* ข้อมูลหลักของอนิเมะ */}
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={currentAnime.image}
          alt={currentAnime.title}
          className="w-full md:w-64 rounded-lg shadow-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{currentAnime.title}</h1>
          <p className="text-gray-400">{currentAnime.year}</p>

          <div className="flex gap-2 mt-2 flex-wrap">
            <Tag label={currentAnime.genre} color="#10b981" />
            <Tag label={`⭐ ${currentAnime.rating}`} color="#f59e0b" />
            {currentAnime.season && <Tag label={currentAnime.season} color="#3b82f6" />}
          </div>

          <p className="mt-4 text-gray-300">{currentAnime.description}</p>

          <button
            onClick={handleToggle}
            className={`mt-6 px-4 py-2 rounded-md font-medium transition ${
              currentAnime.isFavorite
                ? "bg-red-600 hover:bg-red-700"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {currentAnime.isFavorite ? "Remove from My List" : "Add to My List"}
          </button>
        </div>
      </div>

      <div className="mt-8 border-b border-gray-700 flex gap-6 text-lg font-medium">
        <button
          className={`pb-2 ${
            activeTab === "overview" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("overview")}
        >
          ตัวอย่างอนิเมะ
        </button>

        <button
          className={`pb-2 ${
            activeTab === "watch" ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("watch")}
        >
          การรับชม
        </button>

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
        {/* แท็บตัวอย่างอนิเมะ */}
        {activeTab === "overview" && (
          <div>
            {currentAnime.trailerUrl ? (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={currentAnime.trailerUrl}
                  title="Trailer"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ) : (
              <p className="text-gray-400 mt-2">ไม่มีวิดีโอตัวอย่าง</p>
            )}
          </div>
        )}

        {/* แท็บการรับชม */}
        {activeTab === "watch" && (
          <div className="mt-4">
            {currentAnime.platforms?.length ? (
              <>
                {/* ปุ่มเลือกแพลตฟอร์ม */}
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {currentAnime.platforms.map((p) => (
                    <button
                      key={p.name}
                      onClick={() =>
                        setSelectedPlatform(selectedPlatform === p.name ? null : p.name)
                      }
                      className={`flex items-center gap-2 px-4 py-2 rounded-md transition border shadow-sm ${
                        selectedPlatform === p.name
                          ? "bg-blue-600 border-blue-400"
                          : "bg-[#2b2d3e] border-transparent hover:bg-[#3c4060]"
                      }`}
                    >
                      {platformLogos[p.name] && (
                        <img
                          src={platformLogos[p.name]}
                          alt={p.name}
                          className="w-6 h-6 object-contain"
                        />
                      )}
                      <span className="font-medium text-blue-300">
                        {p.name}{" "}
                        {p.episodes?.length ? (
                          <span className="text-gray-300 text-sm">
                            ({p.episodes.length} ตอน)
                          </span>
                        ) : (
                          ""
                        )}
                      </span>
                    </button>
                  ))}
                </div>

                {/* แสดงตอนของแพลตฟอร์มที่เลือก */}
                {selectedPlatform ? (
                  (() => {
                    const selected = currentAnime.platforms.find(
                      (p) => p.name === selectedPlatform
                    );
                    return selected?.episodes?.length ? (
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selected.episodes.map((ep, i) => (
                          <a
                            key={i}
                            href={ep.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg transition flex flex-col shadow"
                          >
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
                      <p className="text-gray-400 text-center">
                        ไม่มีข้อมูลตอนสำหรับ {selectedPlatform}
                      </p>
                    );
                  })()
                ) : (
                  <p className="text-gray-400 text-center">เลือกแพลตฟอร์มเพื่อดูตอน</p>
                )}
              </>
            ) : (
              <p className="text-gray-400 text-center mt-4">ไม่มีข้อมูลการรับชม</p>
            )}
          </div>
        )}


        {/* แท็บตัวละคร */}
        {activeTab === "characters" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentAnime.characters?.length ? (
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
              <p className="text-gray-400">ไม่มีข้อมูลตัวละคร</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
