import { Router } from "express";
import { JWTVerify } from "../middleware/auth.middleware.js";
import {
    addClothingItem,
    getAllAccessories,
    getAllBottoms,
    getAllTops,
    getItemById,
} from "../controllers/clothingItem.controller.js";
import { upload } from "../middleware/multer.middleware.js";
export const clothingItemRouter = Router();

clothingItemRouter
    .route("/add-clothing-item")
    .post(JWTVerify, upload.single("itemImage"), addClothingItem);
clothingItemRouter.route("/get-item-by-id/:itemId").get(JWTVerify, getItemById);

clothingItemRouter.route("/get-all-tops").get(JWTVerify, getAllTops);

clothingItemRouter.route("/get-all-bottoms").get(JWTVerify, getAllBottoms);

clothingItemRouter
    .route("/get-all-accessories")
    .get(JWTVerify, getAllAccessories);
