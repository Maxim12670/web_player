import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import fs from "fs";

export class TrackController {
    static async addTrack(req: Request, res: Response) {
        try {
            if (req.files) {
                const { name } = req.body;
                const logo = req.files.avatar as UploadedFile;
                const track = req.files.track as UploadedFile;

                const logoUploadDir = path.join(__dirname, "../cloud/image");
                const trackUploadDir = path.join(__dirname, "../cloud/track");

                // Создание директорий, если они отсутствуют
                if (!fs.existsSync(logoUploadDir)) {
                    fs.mkdirSync(logoUploadDir, { recursive: true });
                }

                if (!fs.existsSync(trackUploadDir)) {
                    fs.mkdirSync(trackUploadDir, { recursive: true });
                }

                const logoUploadPath = path.join(logoUploadDir, logo.name);
                const trackUploadPath = path.join(trackUploadDir, track.name);

                // Ожидание завершения операций mv
                await new Promise((resolve, reject) => {
                    logo.mv(logoUploadPath, (err: any) => {
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
                console.log("111", track);
                res.send(`name: ${name}`);
            } else {
                res.send({
                    status: false,
                    message: "Нет файлов для загрузки",
                });
            }
        } catch (error: any) {
            console.log("Error in TrackController addTrack: ", error);
            res.send({
                status: false,
                message: "Ошибка при загрузке трека на сервер!",
            });
        }
    }
}
