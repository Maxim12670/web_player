export const trackGenres = ["Not genre", "Rock", "Hip-Hop", "Chanson", "Jazz", "Drill", "Pop", "Rap"];

export interface ITrack {
  track_id?: number;
  name: string;
  author: string | null;
  genre: string | null;
  duration?: string;
  logo_path: string | null;
  track_path: string;
  isActive?: boolean;
  isFavorite?: boolean;
}
