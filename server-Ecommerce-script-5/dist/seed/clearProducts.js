"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../app/modules/product/product.model"));
dotenv_1.default.config();
const clearProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUri = process.env.MONGODB_URL;
        if (!mongoUri) {
            throw new Error("MONGODB_URL environment variable is not defined");
        }
        yield mongoose_1.default.connect(mongoUri);
        console.log("Connected to MongoDB...");
        console.log("Clearing all products...");
        const result = yield product_model_1.default.deleteMany({});
        console.log(`Successfully deleted ${result.deletedCount} products.`);
        console.log("Database product collection is now empty. ✅");
        process.exit(0);
    }
    catch (error) {
        console.error("Error clearing products:", error);
        process.exit(1);
    }
});
clearProducts();
//# sourceMappingURL=clearProducts.js.map