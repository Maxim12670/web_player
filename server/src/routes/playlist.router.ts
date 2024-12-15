import { Router } from "express";
import { PlaylistController } from "../controllers/playlist.controller";

const router = Router();

router.post("/new-playlist", PlaylistController.createPlaylist);
router.post("/delete-playlist", PlaylistController.deleteSelectPlaylist);
router.post("/user-select-playlist", PlaylistController.getUserSelectPlaylist);
router.post("/user-all-playlists", PlaylistController.getUserAllPlaylists);

export default router;
