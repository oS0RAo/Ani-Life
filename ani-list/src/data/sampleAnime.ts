import type { Anime } from "../types/anime";

export const sampleAnime: Anime[] = [
  {
    id: 1,
    title: "Attack on Titan",
    year: 2013,
    genre: "Action, Drama",
    rating: 9.0,
    season: "Winter",
    broadcastDay: "Sunday",
    isFavorite: false,
    image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    description:
      "มนุษยชาติต้องต่อสู้กับไททันเพื่อความอยู่รอด ภายในกำแพงที่กั้นพวกมันไว้ ภารกิจแห่งการทวงคืนอิสรภาพเริ่มต้นขึ้น!",
    trailerUrl: "https://www.youtube.com/embed/MGRm4IzK1SQ",

    platforms: [
      {
        name: "Netflix",
        episodes: [
          {
            id: 1,
            number: 1,
            title: "To You, 2000 Years From Now",
            url: "https://www.netflix.com/title/70299043",
            description: "ตอนเปิดเรื่อง มนุษยชาติเริ่มต้นต่อสู้กับไททันครั้งแรก!",
            thumbnail: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
          },
        ],
      },
      {
        name: "Crunchyroll",
        episodes: [
          {
            id: 2,
            number: 1,
            title: "Shiganshina: Part 1",
            url: "https://www.crunchyroll.com/series/GR751KNZY/attack-on-titan",
            description: "เอเรนและมิคาสะเห็นไททันทะลวงกำแพงชิกันชินะ",
            thumbnail: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
          },
        ],
      },
      {
        name: "Muse Thailand",
        episodes: [
          {
            id: 3,
            number: 1,
            title: "การโจมตีครั้งแรกของไททัน",
            url: "https://www.youtube.com/watch?v=MGRm4IzK1SQ",
            description: "ตอนที่มนุษยชาติต้องเผชิญหน้ากับไททันตัวแรกในรอบร้อยปี",
            thumbnail: "https://cdn.myanimelist.net/images/anime/10/47347l.jpg",
          },
        ],
      },
    ],

    characters: [
      {
        name: "Eren Yeager",
        role: "พระเอก / ผู้ถือครองพลังไททันจู่โจม",
        image: "https://cdn.myanimelist.net/images/characters/10/284121.jpg",
      },
      {
        name: "Mikasa Ackerman",
        role: "เพื่อนร่วมทีม / นักรบผู้แข็งแกร่ง",
        image: "https://cdn.myanimelist.net/images/characters/2/284123.jpg",
      },
      {
        name: "Armin Arlert",
        role: "เพื่อนสนิท / นักวางแผน",
        image: "https://cdn.myanimelist.net/images/characters/3/284120.jpg",
      },
    ],
  },

  {
    id: 2,
    title: "Demon Slayer: Kimetsu no Yaiba",
    year: 2019,
    genre: "Action, Supernatural",
    rating: 8.7,
    season: "Spring",
    broadcastDay: "Saturday",
    isFavorite: false,
    image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    description:
      "ทันจิโร่ เด็กหนุ่มผู้เสียครอบครัวจากการโจมตีของปีศาจ และน้องสาวที่กลายเป็นปีศาจ เขาจึงออกเดินทางเพื่อหาทางรักษาและล้างแค้น",
    trailerUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",

    platforms: [
      {
        name: "Netflix",
        episodes: [
          {
            id: 4,
            number: 1,
            title: "Cruelty",
            url: "https://www.netflix.com/title/81091393",
            description: "ทันจิโร่พบว่าครอบครัวของเขาถูกฆ่าโดยปีศาจ",
            thumbnail: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
          },
        ],
      },
      {
        name: "Muse Thailand",
        episodes: [
          {
            id: 5,
            number: 1,
            title: "การเดินทางของนักล่าปีศาจ",
            url: "https://www.youtube.com/watch?v=VQGCKyvzIM4",
            description: "ทันจิโร่เริ่มต้นการเดินทางพร้อมน้องสาว เนซึโกะ",
            thumbnail: "https://cdn.myanimelist.net/images/anime/1286/99889l.jpg",
          },
        ],
      },
    ],

    characters: [
      {
        name: "Tanjiro Kamado",
        role: "พระเอก / นักล่าปีศาจ",
        image: "https://cdn.myanimelist.net/images/characters/13/401271.jpg",
      },
      {
        name: "Nezuko Kamado",
        role: "น้องสาว / ปีศาจผู้มีจิตใจมนุษย์",
        image: "https://cdn.myanimelist.net/images/characters/10/401272.jpg",
      },
    ],
  },

  {
    id: 3,
    title: "Jujutsu Kaisen",
    year: 2020,
    genre: "Action, Fantasy",
    rating: 8.8,
    season: "Fall",
    broadcastDay: "Friday",
    isFavorite: false,
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    description:
      "ยูจิ อิตาโดริ เด็กหนุ่มผู้มีพลังร่างกายมหาศาล กลืนคำสาปแห่งสุคุนะ และกลายเป็นภาชนะที่อันตรายที่สุดในโลกไสยเวท",
    trailerUrl: "https://www.youtube.com/embed/f8JrZ7Q_p-8",

    platforms: [
      {
        name: "Netflix",
        episodes: [
          {
            id: 6,
            number: 1,
            title: "Ryomen Sukuna",
            url: "https://www.netflix.com/title/81278456",
            description: "ยูจิพบคำสาปและตัดสินใจกินนิ้วของสุคุนะ",
            thumbnail: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
          },
        ],
      },
      {
        name: "Disney+ Hotstar",
        episodes: [
          {
            id: 7,
            number: 1,
            title: "คำสาปแห่งความตาย",
            url: "https://www.hotstar.com/",
            description: "การต่อสู้ครั้งแรกของยูจิกับวิญญาณคำสาป",
            thumbnail: "https://cdn.myanimelist.net/images/anime/1171/109222l.jpg",
          },
        ],
      },
    ],

    characters: [
      {
        name: "Yuji Itadori",
        role: "พระเอก / ภาชนะของสุคุนะ",
        image: "https://cdn.myanimelist.net/images/characters/8/423716.jpg",
      },
      {
        name: "Megumi Fushiguro",
        role: "เพื่อนร่วมทีม / ผู้ใช้สัตว์อัญเชิญ",
        image: "https://cdn.myanimelist.net/images/characters/4/423717.jpg",
      },
      {
        name: "Satoru Gojo",
        role: "อาจารย์ / จอมเวทระดับสูงสุด",
        image: "https://cdn.myanimelist.net/images/characters/16/423718.jpg",
      },
    ],
  },
];
