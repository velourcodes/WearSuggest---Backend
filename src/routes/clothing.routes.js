import { Router } from "express";
import { addClothingItem, getClothingItems, getClothingItemById, deleteClothingItem, getDeletedClothingItems, restoreClothingItem, analyzeClothingImage } from "../controllers/clothingItem.controller.js";
import { JWTVerify } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/analyze").post(
  JWTVerify,
  upload.single("itemImage"),
  analyzeClothingImage
);


router.route("/").post(
  JWTVerify,
  upload.single("itemImage"),
  addClothingItem
);

router.get(
  "/",
  JWTVerify,
  getClothingItems
);

router.get(
  "/deleted",
  JWTVerify,
  getDeletedClothingItems
);

router.get(
  "/:id",
  JWTVerify,
  getClothingItemById
);

router.patch(
  "/:id/restore",
  JWTVerify,
  restoreClothingItem
);

router.delete(
  "/:id",
  JWTVerify,
  deleteClothingItem
);



export default router;
