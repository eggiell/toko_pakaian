import pool from "../db/pool.js";
import bcrypt from "bcrypt";

// ===========================
// GET ALL USERS (ADMIN ONLY)
// ===========================
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, nama_lengkap, role, is_active FROM users"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===========================
// GET PROFILE (ALL ROLES)
// ===========================
export const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, nama_lengkap, role, is_active FROM users WHERE id = $1",
      [req.user.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===========================
// REGISTER USER (ADMIN ONLY)
// ===========================
export const registerUser = async (req, res) => {
  try {
    const { username, password, nama_lengkap, role } = req.body;

    if (!username || !password || !nama_lengkap || !role) {
      return res.status(400).json({ message: "Semua field harus diisi" });
    }

    // Cek username sudah ada
    const check = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (check.rows.length > 0) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Insert user baru
    await pool.query(
      `INSERT INTO users (username, password, nama_lengkap, role, is_active)
       VALUES ($1, $2, $3, $4, true)`,
      [username, hash, nama_lengkap, role]
    );

    res.json({ message: "User berhasil didaftarkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ===========================
// DEACTIVATE USER (ADMIN ONLY)
// ===========================
export const deactivateUser = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "user_id harus diisi" });
    }

    // Admin TIDAK boleh menonaktifkan dirinya sendiri
    if (req.user.id === user_id) {
      return res
        .status(403)
        .json({ message: "Admin tidak boleh menonaktifkan dirinya sendiri" });
    }

    await pool.query(
      "UPDATE users SET is_active = false WHERE id = $1",
      [user_id]
    );

    res.json({ message: "User berhasil dinonaktifkan" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
