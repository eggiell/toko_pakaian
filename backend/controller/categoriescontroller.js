import pool from "../db/pool.js";

// Ambil semua kategori
export const getCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Ambil kategori berdasarkan ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Tambah kategori
export const createCategory = async (req, res) => {
  try {
    const { nama_kategori } = req.body;
    await pool.query(
      "INSERT INTO categories (nama_kategori) VALUES ($1)",
      [nama_kategori]
    );

    res.status(201).json({ message: "Kategori ditambahkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update kategori
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_kategori } = req.body;

    await pool.query(
      "UPDATE categories SET nama_kategori = $1 WHERE id = $2",
      [nama_kategori, id]
    );

    res.json({ message: "Kategori diperbarui" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Hapus kategori
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM categories WHERE id = $1", [id]);

    res.json({ message: "Kategori dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
