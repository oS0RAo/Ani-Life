import React from "react";
import type { User } from "../types/user";

interface NavbarProps {
  setCurrentPage: (
    page: "home" | "browse" | "detail" | "mylist" | "admin" | "schedule"
  ) => void;
  currentUser: User | null;
  onLogout: () => void;
}

export default function Navbar({ setCurrentPage, currentUser, onLogout }: NavbarProps) {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <h1
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

        {/*  แสดงเฉพาะเมื่อเป็นแอดมินเท่านั้น */}
        {currentUser?.role === "admin" && (
          <button onClick={() => setCurrentPage("admin")} className="hover:text-blue-400">
            Admin
          </button>
        )}
      </div>

      {/* ส่วนในการแสดงผู้ใช้ปัจจุบัน */}
      {currentUser && (
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-400">
            {currentUser.username}
          </span>
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
