import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  addTransactionItem
} from "../../controller/transactioncontroller.js";

import { verifyToken, onlyKasir } from "../middleware/authorization.js";

const router = express.Router();

// Semua route transaksi hanya untuk kasir
router.get("/", verifyToken, onlyKasir, getTransactions);
router.get("/:id", verifyToken, onlyKasir, getTransactionById);
router.post("/", verifyToken, onlyKasir, createTransaction);
router.put("/:id", verifyToken, onlyKasir, updateTransaction);

// NEW → ADD ITEM
router.post("/items", verifyToken, onlyKasir, addTransactionItem);

export default router;
