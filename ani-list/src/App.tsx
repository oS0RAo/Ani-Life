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

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);

  useEffect(() => {
    document.title = "Ani Life";
    const saved = localStorage.getItem("animeList");
    if (saved) setAnimeList(JSON.parse(saved));
    else setAnimeList(sampleAnime);
  }, []);

  const toggleFavorite = (anime: Anime) => {
    const updated = animeList.map((a) =>
      a.id === anime.id ? { ...a, isFavorite: !a.isFavorite } : a
    );
    setAnimeList(updated);
  };

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
      case "schedule":
    return (
      <Schedule
        animeList={animeList}
        onSelect={(a) => {
          setSelectedAnime(a);
          setCurrentPage("detail");
        }}
      />
    );

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
