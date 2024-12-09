import { Request, Response } from "express";
import { TrackService } from "../services/track.service";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";
import { TrackRepository } from "../repositories/track.repository";

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

        // метод который возвращает кол-во записей в таблице треки

        const countTracks = await TrackRepository.getCountTrack();

        const newTrackName = `${name}_${countTracks}_logo${path.extname(track.name)}`;
        const newLogoName = `${name}_${countTracks}_avatar${path.extname(logo!.name)}`;

        const trackUploadPath = path.join(trackUploadDir, newTrackName);
        const logoUploadPath = path.join(logoUploadDir, newLogoName);

        const dbTrackPath = path.join("/cloud/track", newTrackName);
        const dbLogoPath = path.join("/cloud/image", newLogoName);

        await new Promise((resolve, reject) => {
          logo!.mv(logoUploadPath, (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(null);
            }
          });
        });

        await new Promise((resolve, reject) => {
          track.mv(trackUploadPath, (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve(null);
            }
          });
        });

        const result = await TrackService.addNewTrack({
          name,
          author,
          genre,
          logo_path: dbLogoPath,
          track_path: dbTrackPath,
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

  static async getTrackById(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const track = await TrackService.getTrackById(Number(id));
      console.log(track);
      if (track) res.status(200).json(track);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
