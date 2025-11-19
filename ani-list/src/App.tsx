import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Detail from "./pages/Detail";
import MyList from "./pages/MyList";
import Admin from "./pages/Admin";
import Schedule from "./pages/Schedule";
import Login from "./pages/Login";
import Register from "./pages/Register";
import type { User } from "./types/user"; 
import type { Anime } from "./types/anime";
import { sampleAnime } from "./data/sampleAnime";


function App() {
  // สถานะสำหรับ "การเปลี่ยนหน้า"
  const [currentPage, setCurrentPage] = useState<
    "home" | "browse" | "detail" | "mylist" | "admin" | "schedule" | "login" | "register"
  >("login");
  
  // สถานะสำหรับเก็บ "หน้าที่แล้ว"
  const [previousPage, setPreviousPage] = useState<
    "home" | "browse" | "mylist" | "schedule" | null
  >(null);

  // สถานะ "รายการอนิเมะทั้งหมด"
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  
  // สถานะ "อนิเมะที่ถูกเลือก"
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  
  // สถานะ "ผู้ใช้ปัจจุบัน"
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // useEffect โหลดข้อมูลอนิเมะ และ "Seed Admin" (ทำงานครั้งเดียว)
  useEffect(() => {
    document.title = "Ani Life";
    try {
      const saved = localStorage.getItem("animeList");
      if (saved) {
        const parsed: Anime[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnimeList(parsed);
        } else {
           // กรณี saved เป็น [] (Array ว่าง)
          setAnimeList(sampleAnime);
          localStorage.setItem("animeList", JSON.stringify(sampleAnime));
        }
      } else {
        // กรณีไม่มี "animeList" ใน localStorage เลย
        setAnimeList(sampleAnime);
        localStorage.setItem("animeList", JSON.stringify(sampleAnime));
      }
    } catch (err) {
      console.error("โหลดข้อมูล animeList ล้มเหลว:", err);
      setAnimeList(sampleAnime);
      localStorage.setItem("animeList", JSON.stringify(sampleAnime));
    }

    try {
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      if (!users.find((u) => u.username === "admin")) {
        users.push({ username: "admin", password: "1234", role: "admin" });
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Admin user seeded successfully.");
      }
    } catch (err) {
      console.error("Failed to seed admin user:", err);
    }

  }, []); // [] = ทำงานครั้งเดียว

  // ตรวจสอบ Session ผู้ใช้
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentPage("home");
    }
  }, []);

  // บันทึก animeLis
  useEffect(() => {
    if (animeList.length > 0) {
      localStorage.setItem("animeList", JSON.stringify(animeList));
    }
  }, [animeList]);

  // ฟังก์ชัน toggleFavorite
  const toggleFavorite = (anime: Anime) => {
    if (!currentUser) return;

    const allUserFavorites = JSON.parse(localStorage.getItem("userFavorites") || "{}");
    const userFavs: number[] = allUserFavorites[currentUser.username] || [];

    const updatedFavs = userFavs.includes(anime.id)
      ? userFavs.filter((id) => id !== anime.id)
      : [...userFavs, anime.id];

    allUserFavorites[currentUser.username] = updatedFavs;
    localStorage.setItem("userFavorites", JSON.stringify(allUserFavorites));

    const updatedAnimeList = animeList.map((a) => ({
      ...a,
      isFavorite: updatedFavs.includes(a.id),
    }));
    setAnimeList(updatedAnimeList);
  };

  // ฟังก์ชัน goToDetail
  const goToDetail = (
    a: Anime,
    from: Exclude<typeof currentPage, "detail" | "admin" | "login" | "register">
  ) => {
    setPreviousPage(from);
    setSelectedAnime(a);
    setCurrentPage("detail");
  };

  // สร้างฟังก์ชันใหม่สำหรับส่งให้ Pages

  // ฟังก์ชันนี้จะถูกเรียกโดย Login.tsx "หลังจาก" ล็อกอินสำเร็จ
  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user); // ตั้งค่า State ผู้ใช้
    setCurrentPage("home"); // เปลี่ยนหน้าไป Home

    // โหลด Favorite
    const allUserFavorites = JSON.parse(localStorage.getItem("userFavorites") || "{}");
    const favIds = allUserFavorites[user.username] || [];
    const updatedAnimeList = animeList.map((a) => ({
      ...a,
      isFavorite: favIds.includes(a.id),
    }));
    setAnimeList(updatedAnimeList);
  };

  // ฟังก์ชันสำหรับให้ Register.tsx เรียกเพื่อกลับไปหน้า Login
  const goToLogin = () => {
    setCurrentPage("login");
  };

  // ฟังก์ชันสำหรับให้ Login.tsx เรียกเพื่อไปหน้า Register
  const goToRegister = () => {
    setCurrentPage("register");
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setCurrentPage("login");
  };

  // ระบบการเปลี่ยนหน้า
  const showPage = () => {
    switch (currentPage) {
      case "login":
        return (
          <Login 
            onLogin={handleLoginSuccess} // ส่งฟังก์ชันเมื่อล็อกอินสำเร็จ
            goToRegister={goToRegister}  // ส่งฟังก์ชันสำหรับไปหน้า Register
          />
        );
      case "register":
        return (
          <Register 
            goToLogin={goToLogin} // ส่งฟังก์ชันสำหรับกลับไปหน้า Login
          />
        );

      case "home":
        return <Home animeList={animeList} onSelect={(a) => goToDetail(a, "home")} />;
      case "browse":
        return <Browse animeList={animeList} onSelect={(a) => goToDetail(a, "browse")} />;
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
      case "mylist": {
        const allUserFavorites = JSON.parse(localStorage.getItem("userFavorites") || "{}");
        const favIds = allUserFavorites[currentUser?.username ?? ""] || [];
        const userFavs = animeList.filter((a) => favIds.includes(a.id));
        return <MyList animeList={userFavs} onSelect={(a) => goToDetail(a, "mylist")} />;
      }
      case "schedule":
        return <Schedule animeList={animeList} onSelect={(a) => goToDetail(a, "schedule")} />;
      case "admin":
        return currentUser?.role === "admin" ? (
          <Admin animeList={animeList} setAnimeList={setAnimeList} />
        ) : (
          <p className="text-red-400 mt-10 text-center">คุณไม่มีสิทธิ์เข้าหน้านี้</p>
        );
      default:
        return null;
    }
  };

  if (
    !currentUser &&
    ["home", "browse", "admin", "mylist", "schedule"].includes(currentPage)
  ) {
    // บังคับกลับไปหน้า Login
    // เนื่องจาก showPage() จะ return Login อยู่แล้วเมื่อ currentPage = "login"
     return (
        <Login 
          onLogin={handleLoginSuccess}
          goToRegister={goToRegister}
        />
      );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {currentUser && (
        <Navbar
          setCurrentPage={setCurrentPage}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
      <div className="max-w-6xl mx-auto p-4">{showPage()}</div>
    </div>
  );
}

export default App;