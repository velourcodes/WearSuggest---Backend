import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { clothingItem } from "../models/clothingItem.model.js";
import mongoose from "mongoose";

const addClothingItem = asyncHandler(async (req, res) => {
    // JWT Verify - isLoggedIn
    // pass req.user._id as ownerId too
    // image localpath, validate and upload on cloudinary
    // put checks on required fields
    // response url, public, save to db
    // create a clothingItem doc
    // save the doc and return without sensitive fields

    const { colour, category, colourTone } = req.body;
    const allowedCategories = ["top", "bottom", "accessories"];
    const allowedColourTones = ["light", "dark", "neutral"];
    const ownerId = req.user?._id;
    console.log(colour, colourTone, category);
    if (!colour?.trim() || !category?.trim() || !colourTone?.trim())
        throw new ApiError(400, "All 3 fields are required to proceed!");

    if (category.trim() && !allowedCategories.includes(category))
        throw new ApiError(400, "Invalid category entered!");

    if (colourTone.trim() && !allowedColourTones.includes(colourTone))
        throw new ApiError(400, "Invalid colour tone entered!");

    const itemImageLocalPath = req.file?.path;

    if (!itemImageLocalPath)
        throw new ApiError(400, "Missing clothing item image file");

    const response = await uploadOnCloudinary(itemImageLocalPath);

    const newClothingItem = await clothingItem.create({
        owner: ownerId,
        colour: colour,
        category: category,
        colourTone: colourTone,
        imageURL: response?.secure_url,
        imagePublicId: response?.public_id,
    });

    newClothingItem.save();
    if (!newClothingItem) throw new ApiError(500, "Internal Server Error!");

    const newClothingItemObject = newClothingItem.toObject();
    delete newClothingItemObject.imagePublicId;

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                newClothingItemObject,
                "Clothing Item was successfully added to wardrobe"
            )
        );
});

const getItemById = asyncHandler(async (req, res) => {
    const { itemId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
        throw new ApiError(400, "Invalid ItemId");
    }
    const item = await clothingItem
        .findOne({
            owner: req.user._id,
            _id: itemId,
        })
        .select("-imagePublicId");
    if (!item) {
        throw new ApiError(404, "No item found");
    }
    res.status(200).json(
        new ApiResponse(200, item, "Item fetched successfully")
    );
});

const getAllTops = asyncHandler(async (req, res) => {
    const tops = await clothingItem
        .find({
            owner: req.user._id,
            category: "top",
        })
        .select("-imagePublicId");
    res.status(200).json(
        new ApiResponse(200, tops, "All Tops fetched successully")
    );
});

const getAllBottoms = asyncHandler(async (req, res) => {
    const bottoms = await clothingItem
        .find({
            owner: req.user._id,
            category: "bottom",
        })
        .select("-imagePublicId");
    res.status(200).json(
        new ApiResponse(200, bottoms, "All bottoms fetched successfully")
    );
});

const getAllAccessories = asyncHandler(async (req, res) => {
    const accessories = await clothingItem
        .find({
            owner: req.user._id,
            category: "accessory",
        })
        .select("-imagePublicId");
    res.status(200).json(
        new ApiResponse(
            200,
            accessories,
            "All accessories fetched successfully"
        )
    );
});

export {
    addClothingItem,
    getItemById,
    getAllTops,
    getAllBottoms,
    getAllAccessories,
};
