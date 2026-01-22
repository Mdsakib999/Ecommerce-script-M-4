
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../app/modules/product/product.model";

dotenv.config();

const clearProducts = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL;
    if (!mongoUri) {
      throw new Error("MONGODB_URL environment variable is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB...");

    console.log("Clearing all products...");
    const result = await Product.deleteMany({});
    
    console.log(`Successfully deleted ${result.deletedCount} products.`);
    console.log("Database product collection is now empty. ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error clearing products:", error);
    process.exit(1);
  }
};

clearProducts();
