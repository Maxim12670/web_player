import { Request, Response } from "express";
import { PlaylistService } from "../services/playlist.service";
import { PlaylistRepository } from "../repositories/playlist.repository";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";

export class PlaylistController {
  static async createPlaylist(req: Request, res: Response) {
    try {
      const { title, description, person_id } = req.body;

      if (req.files) {
        const logo = req.files.logo_path as UploadedFile | null;
        const logoUploadDir = path.join(__dirname, "../cloud/image");

        if (!fs.existsSync(logoUploadDir)) {
          fs.mkdirSync(logoUploadDir, { recursive: true });
        }

        const countPlaylist = await PlaylistRepository.getCountPlaylist();
        const newLogoName = logo != null ? `${title}_${countPlaylist}_logo${path.extname(logo.name)}` : null;

        if (newLogoName != null) {
          const logoUploadPath = path.join(logoUploadDir, newLogoName);
          await new Promise((resolve, reject) => {
            logo!.mv(logoUploadPath, (err: any) => {
              if (err) {
                reject(err);
              } else {
                resolve(null);
              }
            });
          });
        }

        const result = await PlaylistService.createPlaylist({
          title,
          description,
          logo_path: newLogoName != null ? path.join("/cloud/image", newLogoName) : null,
          person_id: person_id,
        });
        console.log(result);
        if (result) res.status(200).json(result);
      } else {
        const result = await PlaylistService.createPlaylist({ title, description, person_id, logo_path: null });

        if (result)
          res.status(200).json({
            data: result,
            message: "Плейлист успешно создан!",
          });
      }
    } catch (error: any) {
      console.log("Error in createPlaylist", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteSelectPlaylist(req: Request, res: Response) {
    try {
      const { personId, playlistId } = req.body;

      const result = await PlaylistService.deleteSelectPlaylist(personId, playlistId);
      if (result) res.status(200).json({ message: "Плейлист успешно удален!" });
    } catch (error: any) {
      console.log("Error in deleteSelectPlaylist", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  static async getCurrentPlaylist(req: Request, res: Response) {
    try {
      const { personId, playlistId } = req.body;

      const result = await PlaylistService.getCurrentPlaylist(personId, playlistId);
      if (result) res.status(200).json(result);
    } catch (error: any) {
      console.log("Error in getUserSelectPlaylist", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  static async getUserAllPlaylists(req: Request, res: Response) {
    try {
      const { personId } = req.body;

      const result = await PlaylistService.getUserAllPlaylists(personId);

      if (result) res.status(200).json(result);
    } catch (error: any) {
      console.log("Error in getUserAllPlaylists", error.message);
      res.status(400).json({ message: error.message });
    }
  }
}
