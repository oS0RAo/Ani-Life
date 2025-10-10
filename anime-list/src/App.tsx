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
  const [currentPage, setCurrentPage] = useState<"home" | "browse" | "detail" | "mylist" | "admin">("home");
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("animeList");
    if (saved) setAnimeList(JSON.parse(saved));
    else setAnimeList(sampleAnime);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("animeList");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnimeList(parsed);
        } else {
          // ถ้ามี key แต่ไม่มีข้อมูล → ใช้ sampleAnime
          setAnimeList(sampleAnime);
          localStorage.setItem("animeList", JSON.stringify(sampleAnime));
        }
      } catch (err) {
        console.error("Error parsing animeList:", err);
        setAnimeList(sampleAnime);
        localStorage.setItem("animeList", JSON.stringify(sampleAnime));
      }
    } else {
      // ถ้าไม่มี key เลย → ใช้ sampleAnime
      setAnimeList(sampleAnime);
      localStorage.setItem("animeList", JSON.stringify(sampleAnime));
    }
  }, []);


  const showPage = () => {
    switch (currentPage) {
      case "home":
        return <Home animeList={animeList} onSelect={(a) => { setSelectedAnime(a); setCurrentPage("detail"); }} />;
      case "browse":
        return <Browse animeList={animeList} onSelect={(a) => { setSelectedAnime(a); setCurrentPage("detail"); }} />;
      case "detail":
        return selectedAnime ? <Detail anime={selectedAnime} goBack={() => setCurrentPage("home")} /> : <p>ไม่พบข้อมูล</p>;
      case "mylist":
        return <MyList />;
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
