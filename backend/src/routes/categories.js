import express from "express";
import { 
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} from "../../controller/categoriescontroller.js";

import { verifyToken, onlyAdmin } from "../middleware/authorization.js";

const router = express.Router();

// hanya admin boleh lihat, buat, edit, hapus kategori
router.get("/", verifyToken, onlyAdmin, getCategories);
router.get("/:id", verifyToken, onlyAdmin, getCategoryById);
router.post("/", verifyToken, onlyAdmin, createCategory);
router.put("/:id", verifyToken, onlyAdmin, updateCategory);
router.delete("/:id", verifyToken, onlyAdmin, deleteCategory);

export default router;
