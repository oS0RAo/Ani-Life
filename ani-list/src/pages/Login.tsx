// src/pages/Login.tsx
import React, { useState } from "react";

// นำเข้า User interface จาก /types/user.ts เพื่อใช้กำหนดโครงสร้างข้อมูล
import type { User } from "../types/user";

export default function Login({
  onLogin,
  goToRegister,
}: {
  // onLogin คือฟังก์ชันที่รับมาจาก App.tsx เมื่อล็อกอินสำเร็จ เราจะเรียกฟังก์ชันนี้และส่งข้อมูล user ที่พบกลับไป
  onLogin: (user: User) => void;
  
  // goToRegister คือฟังก์ชันที่รับมาจาก App.tsx ใช้สำหรับบอก App.tsx ให้เปลี่ยนหน้าไปที่ "register"
  goToRegister: () => void;
}) {
  
  // สร้าง state 'username' เพื่อเก็บค่าที่ผู้ใช้พิมพ์ในช่อง "ชื่อผู้ใช้"
  const [username, setUsername] = useState("");
  // สร้าง state 'password' เพื่อเก็บค่าที่ผู้ใช้พิมพ์ในช่อง "รหัสผ่าน"
  const [password, setPassword] = useState("");

  // ฟังก์ชันนี้จะทำงานเมื่อผู้ใช้กดปุ่ม "เข้าสู่ระบบ"
  const handleLogin = () => {
    // ใช้ .trim() เพื่อลบช่องว่างที่มองไม่เห็น(หน้า-หลัง)ป้องกันกรณีผู้ใช้เผลอกด spacebar ตอนกรอกข้อมูล
    const username_trimmed = username.trim();
    const password_trimmed = password.trim();

    // ดึงข้อมูลผู้ใช้ทั้งหมดจาก localStorage ถ้าไม่มี key "users" อยู่ ให้ใช้ "[]" (Array ว่าง) เป็นค่าเริ่มต้น
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    
    // ค้นหาผู้ใช้ใน Array โดยใช้ข้อมูลที่ .trim() แล้ว
    const found = users.find(
      (u) => u.username === username_trimmed && u.password === password_trimmed
    );
    
    // ถ้า 'found' เป็น undefined (ไม่พบผู้ใช้)
    if (!found) return alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    
    // Log in สำเร็จ บันทึกข้อมูลผู้ใช้ที่พบลงใน localStorage ("currentUser") เพื่อสร้าง Session
    localStorage.setItem("currentUser", JSON.stringify(found));
    
    // เรียกฟังก์ชัน onLogin ที่ App.tsx ส่งมาเพื่ออัปเดต state หลักของแอป
    onLogin(found); 
  };

  return (
    <div className="text-white max-w-sm mx-auto mt-20 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-400 text-center">
        เข้าสู่ระบบ
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
      
      {/* ปุ่มเข้าสู่ระบบ */}
      <button
        onClick={handleLogin} // เมื่อคลิก ให้เรียกฟังก์ชัน handleLogin
        className="bg-blue-600 hover:bg-blue-700 w-full py-2 rounded"
      >
        เข้าสู่ระบบ
      </button>

      {/* ลิงก์สำหรับไปหน้าสมัครสมาชิก */}
      <p className="text-center text-sm mt-4">
        ยังไม่มีบัญชี?{" "}
        <button
          className="text-green-400 underline"
          onClick={goToRegister} // เมื่อคลิก ให้เรียกฟังก์ชัน goToRegister
        >
          สมัครสมาชิก
        </button>
      </p>
    </div>
  );
}