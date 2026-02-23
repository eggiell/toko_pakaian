import express from "express";
import { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../../controller/productscontroller.js";
import { verifyToken, onlyAdmin } from "../middleware/authorization.js";

const router = express.Router();

// Semua produk hanya boleh diakses admin
router.get("/", verifyToken, onlyAdmin, getProducts);
router.get("/:id", verifyToken, onlyAdmin, getProductById);
router.post("/", verifyToken, onlyAdmin, createProduct);
router.put("/:id", verifyToken, onlyAdmin, updateProduct);
router.delete("/:id", verifyToken, onlyAdmin, deleteProduct);

export default router;
