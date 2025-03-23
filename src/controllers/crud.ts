import { Router } from "express";
import { Model } from "mongoose";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";
import apiResponse from "../utils/apiResponse";

const router = Router();

// We define the model type here, ensuring it is a Mongoose model
let model: Model<any> | null = null;

// This function will dynamically set the model and return the router
const getModel = (modelName: Model<any>) => {
  model = modelName;
  return router;
};

// Ensure the model is set before defining routes

// Create route
const create = asyncHandler(async (req, res) => {
  const data = new model!(req.body); // `model!` asserts that model is not null
  await data.save();
  apiResponse(res, 201, "updated", data);
});

// Update route
const update = asyncHandler(async (req, res) => {
  const updatedData = await model!.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedData) {
    throw new ApiError(404, "Resource not found");
  }
  apiResponse(res, 200, "updated", updatedData);
});

// Read (get all) route
const read = asyncHandler(async (req, res) => {
  const data = await model!.find();
  apiResponse(res, 200, "success", data);
});

// Read by ID route
const readById = asyncHandler(async (req, res) => {
  const data = await model!.findById(req.params.id);
  if (!data) {
    throw new ApiError(404, "Resource not found");
  }
  apiResponse(res, 200, "success", data);
});

// Delete route
const deleteAction = asyncHandler(async (req, res) => {
  const data = await model!.findByIdAndDelete(req.params.id);
  if (!data) {
    throw new ApiError(404, "Resource not found");
  }
  apiResponse(res, 200, "deleted Successfully");
});

router.route("/").get(read).post(create);
router.route("/:id").get(readById).put(update).delete(deleteAction);

export default getModel;
