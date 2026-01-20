import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary} from "../utils/cloudinary.js"
import { clothingItem } from "../models/clothingItem.model.js";
import mongoose from "mongoose";

const addClothingItem = asyncHandler(async (req, res) => {
    
});

const getItemById = asyncHandler(async (req, res) => {
    const {itemId} = req.params
    if(!mongoose.Types.ObjectId.isValid(itemId)){
        throw new ApiError(400,"Invalid ItemId")
    }
    const item = await clothingItem.findOne({
        owner: req.user._id,
        _id: itemId
    }).select("-imagePublicId")
    if(!item){
        throw new ApiError(404,"No item found")
    }
    res.status(200)
    .json(new ApiResponse(200,item,"Item fetched successfully"))
});

const getAllTops = asyncHandler(async (req, res) => {
    const tops = await clothingItem.find({
        owner: req.user._id,
        category: "top"
    }).select("-imagePublicId")
    res.status(200)
    .json(new ApiResponse(200,tops,"All Tops fetched successully"))
});

const getAllBottoms = asyncHandler(async (req, res) => {
    const bottoms = await clothingItem.find({
        owner: req.user._id,
        category: "bottom"  
    }).select("-imagePublicId")
    res.status(200)
    .json(new ApiResponse(200,bottoms,"All bottoms fetched successfully"))
});

const getAllAccessories = asyncHandler(async (req, res) => {
    const accessories = await clothingItem.find({
        owner: req.user._id,
        category: "accessory"  
    }).select("-imagePublicId")
    res.status(200)
    .json(new ApiResponse(200,accessories,"All accessories fetched successfully"))
});

export {
    addClothingItem,
    getItemById,
    getAllTops,
    getAllBottoms,
    getAllAccessories,
}