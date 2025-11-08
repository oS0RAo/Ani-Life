export interface Episode {
  id: number;           // ID ของตอน (อาจใช้เป็น key ในการ render list)
  number: number;       // หมายเลขตอน (เช่น 1, 2, 3)
  title: string;        // ชื่อตอน
  url: string;          // ลิงก์สำหรับรับชมตอนนี้
  description?: string; // คำอธิบายตอน (optional, ? = อาจจะมีหรือไม่มีก็ได้)
  thumbnail?: string;   // ลิงก์รูปภาพขนาดย่อของตอน (optional)
}

// กำหนดโครงสร้างของ "Platform" รับชม
export interface Platform {
  name: string;         // ชื่อแพลตฟอร์ม
  episodes: Episode[];  // รายการตอน (Array ของ Episode) ที่มีในแพลตฟอร์มนี้
  logoUrl?: string;
}

// กำหนดโครงสร้างของ "ตัวละคร"
export interface Character {
  id: number;           // ID ของตัวละคร (ใช้สำหรับ Admin ในการ Edit/Delete)
  name: string;         // ชื่อตัวละคร
  role: string;         // บทบาท (เช่น "พระเอก", "อาจารย์")
  image: string;        // ลิงก์รูปภาพของตัวละคร
}

// รวมข้อมูลพื้นฐานและข้อมูลย่อย (Episode, Platform, Character) เข้าด้วยกัน
export interface Anime {
  // ข้อมูลบังคับ
  readonly id: number; // ID ของอนิเมะ (readonly = ห้ามแก้ไขค่านี้หลังจากสร้างแล้ว)
  title: string;        // ชื่อเรื่อง
  year: number;         // ปีที่ออกฉาย
  genre: string;        // แนว (เช่น "Action", "Drama")
  rating: number;       // คะแนน
  image: string;        // ลิงก์รูปภาพปก
  description: string;  // คำอธิบาย/เรื่องย่อ
  
  // --- ข้อมูล Optional
  season?: string;      // ฤดูกาลที่ออกฉาย (เช่น "Winter", "Spring")
  isFavorite?: boolean; // สถานะการติดตามของผู้ใช้ (true/false)
  broadcastDay?: string;// วันที่ออกอากาศ
  trailerUrl?: string;  // ลิงก์ตัวอย่าง
  
  platforms: Platform[]; // Array ของ "Platform" ที่อนิเมะเรื่องนี้มีให้รับชม
  characters?: Character[]; // Array ของ "Character" ที่ปรากฏในอนิเมะเรื่องนี้
}