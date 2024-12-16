import { Request, Response } from "express";
import { FavoriteTrackService } from "../services/favoriteTrack.sevice";

export class FavoriteTrackController {
  static async addTrack(req: Request, res: Response) {
    try {
      const { personId, trackId } = req.body;
      const result = await FavoriteTrackService.addTrack(personId, trackId);
      if (result) res.status(200).json(result);
    } catch (error: any) {
      console.log("Error in addTrack", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteTrack(req: Request, res: Response) {
    try {
      const { personId, trackId } = req.body;
      const result = await FavoriteTrackService.deleteTrack(personId, trackId);
      if (result) res.status(200).json({ message: "Трек успешно удален!" });
    } catch (error: any) {
      console.log("Error in deleteTrack", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllTrack(req: Request, res: Response) {
    try {
      const { personId } = req.body;
      const result = await FavoriteTrackService.getAllTrack(personId);
      if (result) res.status(200).json(result);
    } catch (error: any) {
      console.log("Error in getAllTrack", error.message);
      res.status(400).json({ message: error.message });
    }
  }
}
