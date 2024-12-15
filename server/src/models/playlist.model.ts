export default interface IPlaylist {
  playlist_id?: number;
  title: string;
  description: string | null;
  create_date?: string;
  logo_path?: string | null;
  person_id: number;
}
