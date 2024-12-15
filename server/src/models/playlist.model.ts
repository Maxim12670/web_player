// модель плейлиста

export default interface IPlaylist {
  playlist_id?: number;
  title: string;
  description: string | null;
  create_date?: string;
  logo_path?: string;
  person_id: number;
}
