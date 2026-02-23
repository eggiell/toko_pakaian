import pool from "../db/pool.js";

// ================= GET ALL PRODUCTS =================
export const getProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= GET PRODUCT BY ID =================
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

    if (result.rows.length === 0)
      return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= CREATE PRODUCT =================
export const createProduct = async (req, res) => {
  try {
    const { nama_produk, id_kategori, harga, size, deskripsi, stok } = req.body;

    await pool.query(
      `INSERT INTO products (nama_produk, id_kategori, harga, size, deskripsi, stok) 
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [nama_produk, id_kategori, harga, size, deskripsi, stok]
    );

    res.json({ message: "Produk berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= UPDATE PRODUCT =================
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_produk, id_kategori, harga, size, deskripsi, stok } = req.body;

    await pool.query(
      `UPDATE products 
       SET nama_produk=$1, id_kategori=$2, harga=$3, size=$4, deskrirpsi=$5, stok=$6 
       WHERE id=$7`,
      [nama_produk, id_kategori, harga, size, deskripsi, stok, id]
    );

    res.json({ message: "Produk berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= DELETE PRODUCT =================
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM products WHERE id=$1", [id]);

    res.json({ message: "Produk berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
