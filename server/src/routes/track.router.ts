import { Router } from "express";
import { TrackController } from "../controllers/track.controller";

const router = Router();

router.post("/new-track", TrackController.addTrack);
router.get("/all-tracks", TrackController.getAllTracks);
router.get("/get-track-id", TrackController.getTrackById);
router.get("/get-by-string", TrackController.getTrackByString);

export default router;
