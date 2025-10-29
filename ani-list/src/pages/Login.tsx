import React, { useState } from "react";
import type { User } from "../types/user";

export default function Login({
  onLogin,
  goToRegister,
}: {
  onLogin: (user: User) => void;
  goToRegister: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!found) return alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    localStorage.setItem("currentUser", JSON.stringify(found));
    onLogin(found);
  };

  return (
    <div className="text-white max-w-sm mx-auto mt-20 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
        เข้าสู่ระบบ
      </h2>

      <input
        type="text"
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 mb-3 rounded bg-gray-700 w-full"
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 mb-4 rounded bg-gray-700 w-full"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded"
      >
          เข้าสู่ระบบ
      </button>

      <p className="text-center text-sm mt-4">
        ยังไม่มีบัญชี?{" "}
        <button
          className="text-green-400 underline"
          onClick={goToRegister}
        >
          สมัครสมาชิก
        </button>
      </p>
    </div>
  );
}
