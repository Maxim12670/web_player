// export enum Genres {
//   "Rock",
//   "Hip-Hop",
//   "Chanson",
//   "Jazz",
//   "Drill",
//   "Pop",
//   "Rap",
// }

export default interface ITrack {
  track_id?: number;
  name: string;
  author: string | null;
  genre: string | null;
  logo_path: string | null;
  track_path: string;
}
