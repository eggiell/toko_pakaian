import pool from "../db/pool.js";

// ========================
// GET ALL TRANSACTIONS (KASIR)
// ========================
export const getTransactions = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========================
// GET TRANSACTION BY ID (KASIR)
// ========================
export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM transactions WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========================
// CREATE TRANSACTION (KASIR)
// ========================
export const createTransaction = async (req, res) => {
  try {
    const { id_user } = req.body;

    if (!id_user) {
      return res.status(400).json({ message: "id_user harus diisi" });
    }

    const result = await pool.query(
      `INSERT INTO transactions (id_user) 
       VALUES ($1) RETURNING *`,
      [id_user]
    );

    res.status(201).json({
      message: "Transaksi berhasil dibuat",
      transaction: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ========================
// UPDATE TRANSACTION (OPTIONAL)
// ========================
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_user } = req.body;

    const result = await pool.query(
      "UPDATE transactions SET id_user = $1 WHERE id = $2 RETURNING *",
      [id_user, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    }

    res.json({
      message: "Transaksi berhasil diperbarui",
      data: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================================
// ADD TRANSACTION ITEM (KASIR)
// ================================
export const addTransactionItem = async (req, res) => {
  try {
    const { id_transaction, id_product, jumlah, harga_satuan } = req.body;

    if (!id_transaction || !id_product || !jumlah || !harga_satuan) {
      return res.status(400).json({
        message: "id_transaction, id_product, jumlah, harga_satuan wajib diisi",
      });
    }

    const result = await pool.query(
      `INSERT INTO transaction_items
       (id_transaction, id_product, jumlah, harga_satuan)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [id_transaction, id_product, jumlah, harga_satuan]
    );

    return res.status(201).json({
      message: "Item berhasil ditambahkan",
      item: result.rows[0],
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
