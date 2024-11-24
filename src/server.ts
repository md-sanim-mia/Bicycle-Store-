import mongoose from "mongoose";
import app from ".";
import configs from "./app/config/configs";

async function main() {
  try {
    await mongoose.connect(configs.mongodb_url as string);

    app.listen(configs.port, () => {
      console.log(`Example app listening on port ${configs.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
