import { Router } from "express";
import { FavoriteTrackController } from "../controllers/favoriteTrack.controller";

const router = Router();

router.post("/add", FavoriteTrackController.addTrack);
router.post("/delete", FavoriteTrackController.deleteTrack);
router.post("/all-track", FavoriteTrackController.getAllTrack);

export default router;
