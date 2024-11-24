import { query, Request, Response } from "express";
import bicycleConnectionDb from "./bicycle.server";
import bicycleModel from "./bicycle.model";
import { z } from "zod";
// ---------bicycle data create api---------------
export const bicycleCreate = async (req: Request, res: Response) => {
  try {
    const bicycleValidationSchema = z.object({
      name: z
        .string()
        .min(1, { message: "Name is required and cannot be empty." }),
      brand: z.string().min(1, { message: "Brand is required." }),
      price: z
        .number()
        .positive({ message: "Price must be a positive number." }),
      type: z.enum(["Mountain", "Road", "BMX", "Hybrid", "Electric"], {
        message:
          "Invalid bicycle type. Choose from Mountain, Road, BMX, Hybrid, or Electric.",
      }),
      description: z.string().min(1, { message: "Description is required." }),
      quantity: z
        .number()
        .int({ message: "Quantity must be an integer." })
        .min(1, {
          message: "Quantity must be at least 1.",
        }),
      inStock: z.boolean({ message: "InStock must be a boolean value." }),
    });

    const bicyle = req.body;
    const validationData = bicycleValidationSchema.parse(bicyle);
    const bicycles = await bicycleConnectionDb(validationData);

    res.status(200).json({
      success: true,
      message: "Bicycle created successfully",
      data: bicycles,
    });
  } catch (error: any) {
    console.log(error);
    const stack = new Error("ValidationError").stack;
    console.log(stack);
    res.status(400).json({
      success: false,
      message: "Validation failed",
      error: error,
      stack: stack,
    });
  }
};

// ----------------get all bicycle product data --------------------
export const getAllbicycleData = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm;
    const query = searchTerm
      ? {
          $or: [
            { name: { $regex: searchTerm, $options: "i" } },
            { brand: { $regex: searchTerm, $options: "i" } },
            { type: { $regex: searchTerm, $options: "i" } },
          ],
        }
      : {};

    const products = await bicycleModel.find(query);
    res.status(200).json({
      success: true,
      message: "Bicycles retrieved successfully",
      data: products,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

//  -------searchTerm can be name, brand, type -------

// -------------------get Specific bicycle data --------------
export const getSpecificBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bicycleModel.findOne({ _id: productId });
    res.status(200).json({
      success: true,
      message: "Bicycles retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// --------update bicycle product data --------

export const updateBicycleData = async (req: Request, res: Response) => {
  try {
    const updatBody = req.body;
    const { productId } = req.params;
    const updateData = await bicycleModel.updateOne(
      { _id: productId },
      {
        $set: { price: updatBody.price, quantity: updatBody.quantity },
      }
    );

    const newupdateData = await bicycleModel.findOne({ _id: productId });
    res.status(200).json({
      success: true,
      message: "Bicycle updated successfully",
      data: newupdateData,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
// ------delete bicycle product data -----------------
export const deleteBicycleData = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await bicycleModel.deleteOne({ _id: productId });
    res.status(200).json({
      success: true,
      message: "Bicycle deleted successfully",
      data: {},
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
