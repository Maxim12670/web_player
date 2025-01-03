import { PlaylistTrackService } from "../services/playlistTrack.service";
import IPlaylistTrack from "../models/playlistTrack.model";
import { Request, Response } from "express";
import ITrack from "../models/track.model";

export class PlaylistTrackController {
  static async addTrackPlaylist(req: Request, res: Response) {
    try {
      const { playlistId, trackId } = req.body;
      const result = await PlaylistTrackService.addTrackPlaylist(playlistId, trackId);

      if (result) res.status(200).json(result);
    } catch (error: any) {
      console.log("Error in addTrackPlaylist", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteTrackPlaylist(req: Request, res: Response) {
    try {
      const { playlistId, trackId } = req.body;
      const result = await PlaylistTrackService.deleteTrackPlaylist(playlistId, trackId);

      if (result) res.status(200).json({ message: "Трек успешко удален!" });
    } catch (error: any) {
      console.log("Error in deleteTrackPlaylist", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllTrackPlaylist(req: Request, res: Response) {
    try {
      const { playlistId } = req.body;
      const result: ITrack[] = await PlaylistTrackService.getAllTrackPlaylist(playlistId);

      if (result) res.status(200).json(result);
    } catch (error: any) {
      console.log("Error in getAllTrackPlaylist", error.message);
      res.status(400).json({ message: error.message });
    }
  }
}
