import React, { useState } from "react";
import type { User } from "../types/user";

export default function Register({ goToLogin }: { goToLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const handleRegister = () => {
    if (!username.trim() || !password.trim())
      return alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.username === username))
      return alert("มีชื่อผู้ใช้นี้แล้ว");

    const newUser = { username, password, role };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
    goToLogin();
  };

  return (
    <div className="text-white max-w-sm mx-auto mt-20 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
        สมัครสมาชิก
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
        className="p-2 mb-3 rounded bg-gray-700 w-full"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "user" | "admin")}
        className="p-2 mb-4 rounded bg-gray-700 w-full"
      >
        <option value="user">ผู้ใช้ทั่วไป</option>
        <option value="admin">แอดมิน</option>
      </select>

      <button
        onClick={handleRegister}
        className="bg-green-600 hover:bg-green-700 w-full py-2 rounded"
      >
        สมัครสมาชิก
      </button>

      <p className="text-center text-sm mt-4">
        มีบัญชีอยู่แล้ว?{" "}
        <button
          className="text-blue-400 underline"
          onClick={goToLogin}
        >
          เข้าสู่ระบบ
        </button>
      </p>
    </div>
  );
}
