import React from "react";

interface TagProps {
  // ข้อความ/ชื่อที่จะแสดงบน Tag
  label: string;
  // สีพื้นหลังของ Tag
  color?: string;
}

const Tag: React.FC<TagProps> = ({ label, color }) => {
  return (
    // <span> Element หลักที่ทำหน้าที่เป็น Tag
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium text-white`}
      style={{ backgroundColor: color || "#3b82f6" }}
    >
      {label}
    </span>
  );
};

export default Tag;