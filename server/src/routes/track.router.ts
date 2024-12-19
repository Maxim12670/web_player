import { Router } from "express";
import { TrackController } from "../controllers/track.controller";

const router = Router();

router.post("/new-track", TrackController.addTrack);
router.get("/get-track-id", TrackController.getTrackById);
router.get("/get-tracks-by-name", TrackController.getTrackByName);

export default router;
