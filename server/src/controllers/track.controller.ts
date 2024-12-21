import { Request, Response } from "express";
import { TrackService } from "../services/track.service";
import { TrackRepository } from "../repositories/track.repository";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import getAudioDuration from "get-audio-duration";
import { ConvertTime } from "../utils/convertTime";

export class TrackController {
  static async addTrack(req: Request, res: Response) {
    try {
      if (req.files) {
        const { name, author, genre } = req.body;
        const track = req.files.track as UploadedFile;
        const logo = req.files.avatar as UploadedFile | null;

        const trackUploadDir = path.join(__dirname, "../cloud/track");
        const logoUploadDir = path.join(__dirname, "../cloud/image");

        // Создание директорий, если они отсутствуют
        if (!fs.existsSync(trackUploadDir)) {
          fs.mkdirSync(trackUploadDir, { recursive: true });
        }

        if (!fs.existsSync(logoUploadDir)) {
          fs.mkdirSync(logoUploadDir, { recursive: true });
        }

        const countTracks = await TrackRepository.getCountTrack();
        const newTrackName = `${name}_${countTracks}_logo${path.extname(track.name)}`;
        const newLogoName = logo != null ? `${name}_${countTracks}_avatar${path.extname(logo.name)}` : null;

        const trackUploadPath = path.join(trackUploadDir, newTrackName);

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

        await new Promise((resolve, reject) => {
          track.mv(trackUploadPath, (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(null);
            }
          });
        });

        const audioDuration = await getAudioDuration(trackUploadPath);
        const duration = ConvertTime(audioDuration);

        const result = await TrackService.addNewTrack({
          name,
          author,
          genre,
          logo_path: newLogoName != null ? path.join("/cloud/image", newLogoName) : null,
          track_path: path.join("/cloud/track", newTrackName),
          duration: duration,
        });

        res.status(200).json(result);
      } else {
        res.status(400).json({ message: "Нет файлов для загрузки" });
      }
    } catch (error: any) {
      console.log("Error in TrackController addTrack: ", error);
      res.status(400).json({ message: error.message });
    }
  }

  static async getAllTracks(req: Request, res: Response) {
    try {
      const tracks = await TrackService.getAllTracks();
      if (tracks) res.status(200).json(tracks);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getTrackById(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const track = await TrackService.getTrackById(Number(id));
      if (track) res.status(200).json(track);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getTrackByString(req: Request, res: Response) {
    try {
      const { stringSearch } = req.query;
      const tracks = await TrackService.getTrackByString(String(stringSearch));
      if (tracks) res.status(200).json(tracks);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
