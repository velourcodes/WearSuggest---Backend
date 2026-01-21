import { Router } from "express";
import { JWTVerify } from "../middleware/auth.middleware.js";
import {
  suggestOutfit,
  suggestToneBasedOutfit,
  getRecentOutfits,
} from "../controllers/outfit.controller.js";

const router = Router();

router.post("/suggest", JWTVerify, suggestOutfit);
router.post("/suggest-tone", JWTVerify, suggestToneBasedOutfit);
router.get("/recent", JWTVerify, getRecentOutfits);

export default router;
