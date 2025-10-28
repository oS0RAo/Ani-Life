export interface Episode {
  id: number;
  number: number;
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
}

export interface Platform {
  name: string;
  episodes: Episode[];
}

export interface Character {
  id: number;
  name: string;
  role: string;
  image: string;
}

export interface Anime {
  readonly id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  image: string;
  description: string;
  season?: string;
  isFavorite?: boolean;
  broadcastDay?: string;
  trailerUrl?: string;
  platforms: Platform[];
  characters?: Character[];
}
