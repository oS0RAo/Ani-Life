import React, { useState } from "react";
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

type PageRoute = "home" | "browse" | "detail" | "mylist" | "admin" | "schedule";

// ==============================
//              UI
// ==============================

export default function Navbar({ setCurrentPage, currentUser, onLogout }: NavbarProps) {
  // State สำหรับควบคุมการเปิด/ปิดเมนูมือถือ
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  // ฟังก์ชันนำทางและปิดเมนู
  const navigate = (page: PageRoute) => { 
    setCurrentPage(page);
    setIsMenuOpen(false); // ปิดเมนูทุกครั้งที่คลิก
  };
  
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md relative z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1
        // เมื่อคลิกที่ชื่อ จะนำทางกลับไปหน้า Home
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("home")}
      >
        Anime Life
      </h1>
      
        {/* Hamburger Button (แสดงเฉพาะบนมือถือ) */}
      <div className="flex sm:hidden items-center space-x-3">
        {currentUser && (
          <span className="text-sm text-gray-400">
            {currentUser.username}
          </span>
        )}
        <button 
          className="p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} // สลับสถานะเมนู
          >
          {isMenuOpen ? "✕" : "☰"} 
        </button>
      </div>

      {/* Desktop Navigation + User Status Container (ซ่อนบนมือถือ) */}
      <div className="hidden sm:flex sm:space-x-4 sm:items-center">
        
          {/* Navigation Links */}
        <button onClick={() => navigate("home")} className="hover:text-blue-400">
          Home
        </button>
        <button onClick={() => navigate("schedule")} className="hover:text-blue-400">
          ตารางออกอากาศ
        </button>
        <button onClick={() => navigate("browse")} className="hover:text-blue-400">
          Browse
        </button>
        <button onClick={() => navigate("mylist")} className="hover:text-blue-400">
          My List
        </button>

        {/* ปุ่ม Admin */}
        {currentUser?.role === "admin" && (
          <button onClick={() => navigate("admin")} className="hover:text-blue-400">
            Admin
          </button>
        )}
        
        {/* User Status/Logout (Desktop) */}
        {currentUser && (
          <div className="flex items-center space-x-3 ml-4">
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
      </div>
      
      {/*  Mobile Menu Overlay แสดงเฉพาะ isMenuOpen เป็น true */}
      {isMenuOpen && (
        <div className="sm:hidden bg-gray-800 absolute top-14 left-0 right-0 z-40 p-4 flex flex-col space-y-2 border-t border-gray-700">
          
          {/* Menu ใช้ navigate() เพื่อปิดเมนู */}
          <button onClick={() => navigate("home")} className="hover:text-blue-400 text-left pb-2 border-b border-gray-700">
            Home
          </button>
          <button onClick={() => navigate("schedule")} className="hover:text-blue-400 text-left pb-2 border-b border-gray-700">
            ตารางออกอากาศ
          </button>
          <button onClick={() => navigate("browse")} className="hover:text-blue-400 text-left pb-2 border-b border-gray-700">
            Browse
          </button>
          <button onClick={() => navigate("mylist")} className="hover:text-blue-400 text-left pb-2 border-b border-gray-700">
            My List
          </button>
          
          {currentUser?.role === "admin" && (
            <button onClick={() => navigate("admin")} className="hover:text-blue-400 text-left pb-2 border-b border-gray-700">
              Admin
            </button>
          )}
          
          {/* Logout Button บน Mobile Menu */}
          {currentUser && (
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm mt-3 w-full text-center"
            >
              ออกจากระบบ
            </button>
          )}
        </div>
      )}
      </div>
    </nav>
  );
}