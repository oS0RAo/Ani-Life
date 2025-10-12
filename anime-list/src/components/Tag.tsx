import React from "react";

interface TagProps {
  label: string;
  color?: string;
}

const Tag: React.FC<TagProps> = ({ label, color }) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium text-white`}
      style={{ backgroundColor: color || "#3b82f6" }}
    >
      {label}
    </span>
  );
};

export default Tag;