import { model, Schema } from "mongoose";
import { Bicycle } from "./bicycle.interface";

const bicycleSchema = new Schema<Bicycle>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      enum: ["Mountain", "Road", "BMX", "Hybrid", "Electric"],
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const bicycleModel = model("Bicycle-stors", bicycleSchema);

export default bicycleModel;
