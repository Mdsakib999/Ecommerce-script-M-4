
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "../app/modules/product/product.model";

dotenv.config();

const cleanPrice = (price: string) => {
  return parseFloat(price.replace(/[^0-9.]/g, ""));
};

const products = [
  {
    name: "Strideora Velocity X1",
    brand: "Strideora Limited",
    category: "Running",
    price: 120,
    discountPrice: 99,
    quantity: 50,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "Experience maximum velocity with the Strideora Velocity X1. Designed for professional runners.",
    specifications: "Breathable mesh upper, Responsive foam midsole, Durable rubber outsole",
  },
  {
    name: "Strideora Urban Trek",
    brand: "Strideora Limited",
    category: "Sneakers",
    price: 85,
    discountPrice: 75,
    quantity: 100,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "The perfect blend of style and comfort for your daily urban adventures.",
    specifications: "Genuine leather accents, Cushion insole, Anti-slip sole",
  },
  {
    name: "Strideora Court Master",
    brand: "Strideora Limited",
    category: "Tennis",
    price: 110,
    discountPrice: 0,
    quantity: 30,
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "Dominate the court with superior grip and stability.",
    specifications: "Reinforced toe cap, Herringbone tread pattern, Shock absorption",
  },
  {
    name: "Strideora Cloud Walker",
    brand: "Strideora Limited",
    category: "Walking",
    price: 70,
    discountPrice: 60,
    quantity: 75,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
       "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "Walk on clouds with our lightest shoe yet.",
    specifications: "Ultra-lightweight materials, Memory foam insole, Slip-on design",
  },
  {
    name: "Strideora Trail Blazer",
    brand: "Strideora Limited",
    category: "Hiking",
    price: 150,
    discountPrice: 135,
    quantity: 20,
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
       "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "Conquer any terrain with the rugged Trail Blazer.",
    specifications: "Waterproof Gore-Tex lining, Lugged outsole for traction, Ankle support",
  },
   {
    name: "Strideora Formal Elegance",
    brand: "Strideora Limited",
    category: "Formal",
    price: 180,
    discountPrice: 0,
    quantity: 40,
    images: [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "Classic design meets modern comfort. Perfect for office and events.",
    specifications: "Premium Italian leather, Hand-stitched sole, Timeless oxford style",
  },
  {
    name: "Strideora Summer Breeze",
    brand: "Strideora Limited",
    category: "Sandals",
    price: 45,
    discountPrice: 35,
    quantity: 120,
    images: [
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "Keep cool this summer with our breathable and stylish sandals.",
    specifications: "Adjustable straps, Cork footbed, Durable eva sole",
  },
  {
    name: "Strideora High Tops",
    brand: "Strideora Limited",
    category: "Sneakers",
    price: 95,
    discountPrice: 0,
    quantity: 60,
    images: [
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "Retro-inspired high tops for a street-smart look.",
    specifications: "Canvas upper, Rubber toe cap, Vulcanized rubber sole",
  },
  {
    name: "Strideora Runner Pro",
    brand: "Strideora Limited",
    category: "Running",
    price: 130,
    discountPrice: 110,
    quantity: 45,
    images: [
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "Advanced running technology for serious athletes.",
    specifications: "Carbon fiber plate, Knit ultra-light upper, Energy return boost foam",
  },
  {
    name: "Strideora Casual Loafer",
    brand: "Strideora Limited",
    category: "Casual",
    price: 65,
    discountPrice: 0,
    quantity: 90,
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true,
    description: "Effortless style for your casual days.",
    specifications: "Suede upper, Moccasin toe, Flexible driver sole",
  }
];

const seedProducts = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL;
    if (!mongoUri) {
      throw new Error("MONGODB_URL environment variable is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB for seeding...");

    console.log("Clearing existing products...");
    await Product.deleteMany({});

    console.log("Inserting new Strideora footwear products...");
    await Product.insertMany(products);

    console.log("Seeding completed successfully! ✅");
    process.exit(0);
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
};

seedProducts();
