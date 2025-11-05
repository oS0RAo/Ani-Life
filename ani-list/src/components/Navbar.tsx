import React from "react";
import type { User } from "../types/user";

interface NavbarProps {
  // ฟังก์ชันสำหรับเปลี่ยนหน้า
  // กำหนด Type ของ page เพื่อควบคุมการนำทาง
  setCurrentPage: (
    page: "home" | "browse" | "detail" | "mylist" | "admin" | "schedule"
  ) => void;
  // ข้อมูลผู้ใช้ปัจจุบันที่เข้าสู่ระบบอยู่ เป็น null ถ้ายังไม่เข้าสู่ระบบ
  currentUser: User | null;
  // ฟังก์ชันสำหรับจัดการเมื่อผู้ใช้กดปุ่มออกจากระบบ
  onLogout: () => void;
}

export default function Navbar({ setCurrentPage, currentUser, onLogout }: NavbarProps) {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1
        // เมื่อคลิกที่ชื่อ จะนำทางกลับไปหน้า Home
        className="text-2xl font-bold cursor-pointer"
        onClick={() => setCurrentPage("home")}
      >
        Anime Life
      </h1>

      <div className="space-x-4">
        <button onClick={() => setCurrentPage("home")} className="hover:text-blue-400">
          Home
        </button>
        <button onClick={() => setCurrentPage("schedule")} className="hover:text-blue-400">
          ตารางออกอากาศ
        </button>
        <button onClick={() => setCurrentPage("browse")} className="hover:text-blue-400">
          Browse
        </button>
        <button onClick={() => setCurrentPage("mylist")} className="hover:text-blue-400">
          My List
        </button>

        {/* ปุ่ม Admin จะแสดงผลแบบมีเงื่อนไข */}
        {/* ปุ่มนี้จะแสดงก็ต่อเมื่อ currentUser ไม่เป็น null และ role ของผู้ใช้คือ "admin" เท่านั้น */}
        {currentUser?.role === "admin" && (
          <button onClick={() => setCurrentPage("admin")} className="hover:text-blue-400">
            Admin
          </button>
        )}
      </div>

      {/* แสดงส่วนนี้ก็ต่อเมื่อมีผู้ใช้เข้าสู่ระบบอยู่ currentUser ไม่เป็น null */}
      {currentUser && (
        <div className="flex items-center space-x-3">
          {/* แสดงชื่อผู้ใช้ปัจจุบัน */}
          <span className="text-sm text-gray-400">
            {currentUser.username}
          </span>
          {/* ปุ่มออกจากระบบ เรียกใช้ฟังก์ชัน onLogout */}
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
          >
            ออกจากระบบ
          </button>
        </div>
      )}
    </nav>
  );
}
