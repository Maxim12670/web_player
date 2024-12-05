import { Router } from "express";
import { TrackController } from "../controllers/track.controller";

const router = Router();

router.post("/new-track", TrackController.addTrack);
router.get("/get-track", TrackController.getTrackById);

export default router;
