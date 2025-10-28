import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Detail from "./pages/Detail";
import MyList from "./pages/MyList";
import Admin from "./pages/Admin";
import Schedule from "./pages/Schedule";
import type { Anime } from "./types/anime";
import { sampleAnime } from "./data/sampleAnime";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "browse" | "detail" | "mylist" | "admin" | "schedule"
  >("home");
  const [previousPage, setPreviousPage] = useState<
    "home" | "browse" | "mylist" | "schedule" | null
  >(null);

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  // โหลดข้อมูลครั้งแรก
  useEffect(() => {
    document.title = "Ani Life";

    try {
      const saved = localStorage.getItem("animeList");

      if (saved) {
        const parsed: Anime[] = JSON.parse(saved);

        //  ตรวจสอบว่ามีข้อมูลจริงไหม (ไม่ใช่ [])
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnimeList(parsed);
          return; // ใช้ข้อมูลที่เคยบันทึกไว้
        }
      }

      //  ถ้าไม่มีข้อมูลใน localStorage ให้ใช้ข้อมูลใน sampleAnime
      setAnimeList(sampleAnime);
      localStorage.setItem("animeList", JSON.stringify(sampleAnime));
    } catch (err) {
      console.error("โหลดข้อมูล animeList ล้มเหลว:", err);
      setAnimeList(sampleAnime);
      localStorage.setItem("animeList", JSON.stringify(sampleAnime));
    }
  }, []);

  // อัปเดต localStorage ทุกครั้งที่ animeList เปลี่ยน
  useEffect(() => {
    if (animeList.length > 0) {
      localStorage.setItem("animeList", JSON.stringify(animeList));
    }
  }, [animeList]);

  // toggle favorite
  const toggleFavorite = (anime: Anime) => {
    const updated = animeList.map((a) =>
      a.id === anime.id ? { ...a, isFavorite: !a.isFavorite } : a
    );
    setAnimeList(updated);
  };

  // เปิดหน้า Detail
  const goToDetail = (
    a: Anime,
    from: Exclude<typeof currentPage, "detail" | "admin">
  ) => {
    setPreviousPage(from);
    setSelectedAnime(a);
    setCurrentPage("detail");
  };

  // ส่วนการแสดงแต่ละหน้า
  const showPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home animeList={animeList} onSelect={(a) => goToDetail(a, "home")} />
        );

      case "browse":
        return (
          <Browse
            animeList={animeList}
            onSelect={(a) => goToDetail(a, "browse")}
          />
        );

      case "detail":
        return selectedAnime ? (
          <Detail
            anime={selectedAnime}
            goBack={() => setCurrentPage(previousPage ?? "home")}
            toggleFavorite={toggleFavorite}
          />
        ) : (
          <p className="text-white">ไม่พบข้อมูล</p>
        );

      case "mylist":
        return (
          <MyList
            animeList={animeList}
            onSelect={(a) => goToDetail(a, "mylist")}
          />
        );

      case "admin":
        return <Admin animeList={animeList} setAnimeList={setAnimeList} />;

      case "schedule":
        return (
          <Schedule
            animeList={animeList}
            onSelect={(a) => goToDetail(a, "schedule")}
          />
        );

      default:
        return null;
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
