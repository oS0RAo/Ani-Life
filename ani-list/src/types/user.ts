export interface User {
  // ข้อมูลบังคับ
  username: string; // ชื่อผู้ใช้ (ต้องเป็น string)
  password: string; // รหัสผ่าน (ต้องเป็น string)
  
  // Role (บทบาท) ของผู้ใช้
  // เป็น "Literal Type" ค่าของ 'role' จะต้องเป็น "user" หรือ "admin" เท่านั้น
  role: "user" | "admin"; 
}