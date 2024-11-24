import { Request, Response } from "express";
import bicycleModel from "./bicycle.model";
import bicycleOrderModel from "./bicycle.order.modle";

export const totalOrderBicycle = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    // ---------find the product data---------
    if (!body.email) {
      res.status(400).json({ success: false, message: "invalid email" });
      return;
    }
    const product = await bicycleModel.findOne({ _id: body.product });

    if (!product) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    //---------check quantity --------------
    if (product.quantity < body.quantity) {
      console.log(body.quantity, product.quantity);
      res.status(400).json({ success: false, message: "Insufficient stock" });
      return;
    }
    // -------update quantity balance and inStock update
    const updateProudct = await bicycleModel.updateOne(
      { _id: body.product },
      {
        $inc: { quantity: -body.quantity },
        $set: { inStock: product.quantity - body.quantity <= 0 ? false : true },
      }
    );

    if (updateProudct.modifiedCount === 0) {
      res
        .status(500)
        .json({ success: false, message: "Failed to update stock" });
      return;
    }

    //------------- create product orders----------------
    const result1 = await bicycleOrderModel.create(body);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: result1,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

// ----------Calculate Revenue from Orders-----------

export const totalRevenueOfOrders = async (req: Request, res: Response) => {
  try {
    const revenue = await bicycleOrderModel.aggregate([
      //stage number 1

      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
      //stage 2

      {
        $project: { _id: 0 },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Revenue calculated successfully",
      data: revenue[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
