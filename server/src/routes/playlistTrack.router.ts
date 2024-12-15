import { Router } from "express";
import { PlaylistTrackController } from "../controllers/playlistTrack.controller";

const router = Router();

router.post("/new-track-playlist", PlaylistTrackController.addTrackPlaylist);
router.post("/delete-track-playlist", PlaylistTrackController.deleteTrackPlaylist);
router.post("/all-track-playlist", PlaylistTrackController.getAllTrackPlaylist);

export default router;