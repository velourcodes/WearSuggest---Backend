import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateOutfit } from "../services/outfit/outfitAssembler.service.js";
import { Outfit } from "../models/outfit.model.js";

const suggestOutfit = asyncHandler(async (req, res) => {
  const { occasion, season } = req.body;

  if (!occasion) {
    throw new ApiError(400, "Occasion is required");
  }

  const outfit = await generateOutfit({
    userId: req.user._id,
    occasion,
    season,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, outfit, "Outfit suggested successfully"));
});

const getRecentOutfits = asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 7, 20);

  const outfits = await Outfit.find({
    owner: req.user._id,
  })
    .sort({ lastWornAt: -1 })
    .limit(limit)
    .populate("top", "-imagePublicId")
    .populate("bottom", "-imagePublicId")
    .populate("footwear", "-imagePublicId")
    .populate("outerwear", "-imagePublicId")
    .populate("accessories", "-imagePublicId");

  return res.status(200).json(
    new ApiResponse(200, outfits, "Recent outfits fetched successfully")
  );
});


export { suggestOutfit, getRecentOutfits };
