import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("URI:", process.env.MONGO_URI);

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ Connected successfully");
} catch (err) {
  console.error("❌ Connection failed");
  console.error(err);
} finally {
  await mongoose.disconnect().catch(() => {});
}