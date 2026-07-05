import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`TaskFlow API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start API:", error.message);
    process.exit(1);
  });
