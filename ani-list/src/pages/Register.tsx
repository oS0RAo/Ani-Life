import React, { useState } from "react";
// นำเข้า User interface จาก /types/user.ts เพื่อใช้กำหนดโครงสร้างข้อมูล
import type { User } from "../types/user";

// รับ Prop 'goToLogin' มาจาก App.tsx
export default function Register({ goToLogin }: { 
  // goToLogin คือฟังก์ชันที่รับมาจาก App.tsx ใช้สำหรับบอก App.tsx ให้เปลี่ยนหน้ากลับไปที่ "login"
  goToLogin: () => void 
}) {
  
  // สร้าง state 'username' เพื่อเก็บค่าที่ผู้ใช้พิมพ์ในช่อง "ชื่อผู้ใช้"
  const [username, setUsername] = useState("");
  // สร้าง state 'password' เพื่อเก็บค่าที่ผู้ใช้พิมพ์ในช่อง "รหัสผ่าน"
  const [password, setPassword] = useState("");

  // ฟังก์ชันนี้จะทำงานเมื่อผู้ใช้กดปุ่ม "สมัครสมาชิก"
  const handleRegister = () => {
    // ใช้ .trim() เพื่อลบช่องว่างที่มองไม่เห็น (หน้า-หลัง)
    const username_trimmed = username.trim();
    const password_trimmed = password.trim(); // trim รหัสผ่านด้วย

    // ตรวจสอบว่าผู้ใช้กรอกข้อมูลครบหรือไม่
    if (!username_trimmed || !password_trimmed)
      return alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");

    // ดึงข้อมูลผู้ใช้ทั้งหมดจาก localStorage
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    // ตรวจสอบชื่อผู้ใช้ซ้ำ โดยใช้ค่าที่ trim แล้ว
    if (users.find((u) => u.username === username_trimmed))
      return alert("มีชื่อผู้ใช้นี้แล้ว");

    // สร้าง Object ผู้ใช้ใหม่ โดยใช้ค่าที่ trim แล้ว
    const newUser = { 
      username: username_trimmed, 
      password: password_trimmed, // บันทึกรหัสผ่านที่ trim แล้ว
      role: "user" // กำหนดให้ผู้ใช้ใหม่เป็น "user" เสมอ
    };
    
    // บันทึก Array ผู้ใช้ชุดใหม่ (ผู้ใช้เดิม + ผู้ใช้ใหม่) ลง localStorage
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    
    // แจ้งเตือนและนำทางกลับไปหน้า Login
    alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
    goToLogin(); // เรียกฟังก์ชันที่ App.tsx ส่งมา
  };

  return (
    <div className="text-white max-w-sm mx-auto mt-20 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
        สมัครสมาชิก
      </h2>

      {/* ช่องกรอกชื่อผู้ใช้ */}
      <input
        type="text"
        placeholder="ชื่อผู้ใช้"
        value={username} // ค่าในช่อง input ถูกควบคุมโดย state 'username'
        onChange={(e) => setUsername(e.target.value)} // เมื่อพิมพ์ ให้อัปเดต state
        className="p-2 mb-3 rounded bg-gray-700 w-full"
      />
      {/* ช่องกรอกรหัสผ่าน */}
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password} // ค่าในช่อง input ถูกควบคุมโดย state 'password'
        onChange={(e) => setPassword(e.target.value)} // เมื่อพิมพ์ ให้อัปเดต state
        className="p-2 mb-4 rounded bg-gray-700 w-full"
      />

      {/* ปุ่มสมัครสมาชิก */}
      <button
        onClick={handleRegister} // เมื่อคลิก ให้เรียกฟังก์ชัน handleRegister
        className="bg-green-600 hover:bg-green-700 w-full py-2 rounded"
      >
        สมัครสมาชิก
      </button>

      {/* ลิงก์สำหรับกลับไปหน้าล็อกอิน */}
      <p className="text-center text-sm mt-4">
        มีบัญชีอยู่แล้ว?{" "}
        <button
          className="text-blue-400 underline"
          onClick={goToLogin} // เมื่อคลิก ให้เรียกฟังก์ชัน goToLogin
        >
          เข้าสู่ระบบ
        </button>
      </p>
    </div>
  );
}