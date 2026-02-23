import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./src/routes/auth.js";
import userRoutes from "./src/routes/users.js";
import categoryRoutes from "./src/routes/categories.js";
import productRoutes from "./src/routes/products.js";
import transactionRoutes from "./src/routes/transaction.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API TOKO-PAKAIIAN is running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
