import { Router } from "express";
import { PlaylistController } from "../controllers/playlist.controller";

const router = Router();

router.post("/create-playlist", PlaylistController.createPlaylist);
router.post("/delete-playlist", PlaylistController.deleteSelectPlaylist);
router.post("/get-select-playlist", PlaylistController.getCurrentPlaylist);
router.post("/all-playlists", PlaylistController.getUserAllPlaylists);

export default router;
