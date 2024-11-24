import { Bicycle } from "./bicycle.interface";
import bicycleModel from "./bicycle.model";

const bicycleConnectionDb = async (bicycleData: Bicycle) => {
  const result = await bicycleModel.create(bicycleData);

  return result;
};

export = bicycleConnectionDb;
