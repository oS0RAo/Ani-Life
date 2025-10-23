export interface Anime {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  image: string;
  description: string;
  season?: string;
  isFavorite?: boolean;
  broadcastDay?: string;
}
