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

interface User {
  username: string;
  password: string;
  role: "user" | "admin";
}

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "browse" | "detail" | "mylist" | "admin" | "schedule" | "login" | "register"
  >("login");
  const [previousPage, setPreviousPage] = useState<
    "home" | "browse" | "mylist" | "schedule" | null
  >(null);

  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    document.title = "Ani Life";
    try {
      const saved = localStorage.getItem("animeList");
      if (saved) {
        const parsed: Anime[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnimeList(parsed);
          return;
        }
      }
      setAnimeList(sampleAnime);
      localStorage.setItem("animeList", JSON.stringify(sampleAnime));
    } catch (err) {
      console.error("โหลดข้อมูล animeList ล้มเหลว:", err);
      setAnimeList(sampleAnime);
      localStorage.setItem("animeList", JSON.stringify(sampleAnime));
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setCurrentPage("home");
    }
  }, []);

  useEffect(() => {
    if (animeList.length > 0) {
      localStorage.setItem("animeList", JSON.stringify(animeList));
    }
  }, [animeList]);

  // ระบบการกด favorite แยกตาม user
  const toggleFavorite = (anime: Anime) => {
    if (!currentUser) return;

    const allUserFavorites = JSON.parse(localStorage.getItem("userFavorites") || "{}");
    const userFavs: number[] = allUserFavorites[currentUser.username] || [];

    const updatedFavs = userFavs.includes(anime.id)
      ? userFavs.filter((id) => id !== anime.id)
      : [...userFavs, anime.id];

    allUserFavorites[currentUser.username] = updatedFavs;
    localStorage.setItem("userFavorites", JSON.stringify(allUserFavorites));

    // ✅ อัปเดตสถานะใน animeList ให้สอดคล้องกับ user ปัจจุบัน
    const updatedAnimeList = animeList.map((a) => ({
      ...a,
      isFavorite: updatedFavs.includes(a.id),
    }));
    setAnimeList(updatedAnimeList);
    localStorage.setItem("animeList", JSON.stringify(updatedAnimeList));
  };

  const goToDetail = (
    a: Anime,
    from: Exclude<typeof currentPage, "detail" | "admin" | "login" | "register">
  ) => {
    setPreviousPage(from);
    setSelectedAnime(a);
    setCurrentPage("detail");
  };

  const handleRegister = (username: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.username === username)) {
      alert("ชื่อผู้ใช้นี้ถูกใช้แล้ว");
      return;
    }

    const newUser: User = { username, password, role: "user" };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("สมัครสมาชิกสำเร็จ!");
    setCurrentPage("login");
  };

  const handleLogin = (username: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // เพิ่มแอดมินเริ่มต้น
    if (!users.find((u) => u.username === "admin")) {
      users.push({ username: "admin", password: "1234", role: "admin" });
      localStorage.setItem("users", JSON.stringify(users));
    }

    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setCurrentUser(found);
      localStorage.setItem("currentUser", JSON.stringify(found));
      setCurrentPage("home");

      // โหลดสถานะ favorite ของ user
      const allUserFavorites = JSON.parse(localStorage.getItem("userFavorites") || "{}");
      const favIds = allUserFavorites[found.username] || [];
      const updatedAnimeList = animeList.map((a) => ({
        ...a,
        isFavorite: favIds.includes(a.id),
      }));
      setAnimeList(updatedAnimeList);
    } else {
      alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    setCurrentPage("login");
  };

  const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h1 className="text-3xl font-bold mb-4">เข้าสู่ระบบ Ani Life</h1>
        <input
          className="p-2 mb-2 rounded bg-gray-800 w-64"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="p-2 mb-4 rounded bg-gray-800 w-64"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => handleLogin(username, password)}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-2"
        >
          เข้าสู่ระบบ
        </button>
        <p>
          ยังไม่มีบัญชี?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => setCurrentPage("register")}
          >
            สมัครสมาชิก
          </span>
        </p>
      </div>
    );
  };

  const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h1 className="text-3xl font-bold mb-4">สมัครสมาชิก Ani Life</h1>
        <input
          className="p-2 mb-2 rounded bg-gray-800 w-64"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="p-2 mb-4 rounded bg-gray-800 w-64"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => handleRegister(username, password)}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded mb-2"
        >
          สมัครสมาชิก
        </button>
        <p>
          มีบัญชีอยู่แล้ว?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            กลับไปเข้าสู่ระบบ
          </span>
        </p>
      </div>
    );
  };

  const showPage = () => {
    switch (currentPage) {
      case "login":
        return <LoginPage />;
      case "register":
        return <RegisterPage />;
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
    return <LoginPage />;
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
