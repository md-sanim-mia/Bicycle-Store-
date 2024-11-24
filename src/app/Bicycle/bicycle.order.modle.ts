import { model, Schema } from "mongoose";
import { BicycleOrder } from "./bicycle.interface";

const bicycleOrderSchema = new Schema<BicycleOrder>(
  {
    email: { type: String, required: true },
    product: { type: Object, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const bicycleOrderModel = model("Bicycle-orders", bicycleOrderSchema);

export default bicycleOrderModel;
