import type { Anime } from "../types/anime";

export const sampleAnime: Anime[] = [
  {
    id: 1,
    title: "Attack on Titan",
    year: 2013,
    genre: "Action",
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
        image: "https://pm1.aminoapps.com/6525/22c678780ade1749016a35cafe9f89224442445a_hq.jpg",
        id: 0
      },
      {
        name: "Mikasa Ackerman",
        role: "เพื่อนร่วมทีม / นักรบผู้แข็งแกร่ง",
        image: "https://i1.sndcdn.com/artworks-KzmlSku4ygWTfyfx-2jkw0A-t500x500.jpg",
        id: 0
      },
      {
        name: "Armin Arlert",
        role: "เพื่อนสนิท / นักวางแผน",
        image: "https://i.pinimg.com/736x/60/cb/1e/60cb1e819f8953ad3121142840e47d6f.jpg",
        id: 0
      },
    ],
  },

  {
    id: 2,
    title: "Demon Slayer: Kimetsu no Yaiba",
    year: 2019,
    genre: "Action",
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
        image: "https://us.oricon-group.com/upimg/sns/4000/4438/img1200/tanjiro-kamado-6.jpg",
        id: 0
      },
      {
        name: "Nezuko Kamado",
        role: "น้องสาว / ปีศาจผู้มีจิตใจมนุษย์",
        image: "https://anibase.net/files/877d03ad6ee010c6698a621e454e1667",
        id: 0
      },
    ],
  },

  {
    id: 3,
    title: "Jujutsu Kaisen",
    year: 2020,
    genre: "Action",
    rating: 8.8,
    season: "Fall",
    broadcastDay: "Friday",
    isFavorite: false,
    image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    description:
      "ยูจิ อิตาโดริ เด็กหนุ่มผู้มีพลังร่างกายมหาศาล กลืนคำสาปแห่งสุคุนะ และกลายเป็นภาชนะที่อันตรายที่สุดในโลกไสยเวท",
    trailerUrl: "https://www.youtube.com/embed/pkKu9hLT-t8?si=ZZxFX_nbWXdWj19y",

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
        image: "https://upload.wikimedia.org/wikipedia/it/thumb/7/74/Yuji_Itadori.jpg/1200px-Yuji_Itadori.jpg",
        id: 0
      },
      {
        name: "Megumi Fushiguro",
        role: "เพื่อนร่วมทีม / ผู้ใช้สัตว์อัญเชิญ",
        image: "https://shapes.inc/api/public/avatar/megumifushiguroo",
        id: 0
      },
      {
        name: "Satoru Gojo",
        role: "อาจารย์ / นักคุณไสยระดับพิเศษ",
        image: "https://us.oricon-group.com/upimg/sns/2000/2821/img1200/Satoru-Gojo-from-jjk-EP3%20(8).jpg",
        id: 0
      },
    ],
  },
];
