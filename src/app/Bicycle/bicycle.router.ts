import express from "express";
import {
  bicycleCreate,
  deleteBicycleData,
  getAllbicycleData,
  getSpecificBicycle,
  updateBicycleData,
} from "./bicycle.contllor";
import {
  totalOrderBicycle,
  totalRevenueOfOrders,
} from "./bicycle.order.contllor";

const router = express.Router();

router.post("/products", bicycleCreate);
router.get("/products", getAllbicycleData);
router.get("/products/:productId", getSpecificBicycle);
router.put("/products/:productId", updateBicycleData);
router.delete("/products/:productId", deleteBicycleData);
router.post("/orders", totalOrderBicycle);
router.get("/orders/revenue", totalRevenueOfOrders);

export = router;
