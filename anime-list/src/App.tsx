import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Detail from "./pages/Detail";
import MyList from "./pages/MyList";
import Admin from "./pages/Admin";
import type { Anime } from "./types/anime";
import { sampleAnime } from "./data/sampleAnime";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "browse" | "detail" | "mylist" | "admin"
  >("home");
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("animeList");
      if (saved) {
        const parsed = JSON.parse(saved);
        // ถ้ามีข้อมูลจริงถึงจะใช้ ไม่งั้นโหลด sampleAnime
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnimeList(parsed);
        } else {
          console.log("🔄 localStorage ว่าง → ใช้ sampleAnime");
          setAnimeList(sampleAnime);
          localStorage.setItem("animeList", JSON.stringify(sampleAnime));
        }
      } else {
        console.log("💾 ไม่มี animeList → ใช้ sampleAnime");
        setAnimeList(sampleAnime);
        localStorage.setItem("animeList", JSON.stringify(sampleAnime));
      }
    } catch (e) {
      console.error("❌ โหลด animeList ล้มเหลว:", e);
      setAnimeList(sampleAnime);
      localStorage.setItem("animeList", JSON.stringify(sampleAnime));
    }
  }, []);

  // บันทึกเมื่อ animeList เปลี่ยน
  useEffect(() => {
    localStorage.setItem("animeList", JSON.stringify(animeList));
  }, [animeList]);

  // ฟังก์ชันสลับสถานะ Favorite
  const toggleFavorite = (anime: Anime) => {
    const updated = animeList.map((a) =>
      a.id === anime.id ? { ...a, isFavorite: !a.isFavorite } : a
    );
    setAnimeList(updated);
    setSelectedAnime({ ...anime, isFavorite: !anime.isFavorite });
  };

  // ตัวจัดการแสดงหน้าปัจจุบัน
  const showPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            animeList={animeList}
            onSelect={(a) => {
              setSelectedAnime(a);
              setCurrentPage("detail");
            }}
          />
        );
      case "browse":
        return (
          <Browse
            animeList={animeList}
            onSelect={(a) => {
              setSelectedAnime(a);
              setCurrentPage("detail");
            }}
          />
        );
      case "detail":
        return selectedAnime ? (
          <Detail
            anime={selectedAnime}
            goBack={() => setCurrentPage("home")}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <p className="text-white">ไม่พบข้อมูล</p>
        );
      case "mylist":
        return (
          <MyList
            animeList={animeList}
            onSelect={(a) => {
              setSelectedAnime(a);
              setCurrentPage("detail");
            }}
          />
        );
      case "admin":
        return <Admin animeList={animeList} setAnimeList={setAnimeList} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar setCurrentPage={setCurrentPage} />
      <div className="max-w-6xl mx-auto p-4">{showPage()}</div>
    </div>
  );
}

export default App;
