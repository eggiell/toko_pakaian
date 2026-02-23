import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db/pool.js";

dotenv.config();

// ====================== LOGIN ======================
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Cek user
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const user = result.rows[0];

    // Cek password TANPA bcrypt
    if (password !== user.password) {
      return res.status(401).json({ message: "Password salah" });
    }

    // Bikin token
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login berhasil",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};

// ====================== LOGOUT ======================
export const logout = async (req, res) => {
  return res.json({ message: "Logout berhasil, token dihapus di sisi client" });
};

// ====================== REFRESH TOKEN ======================
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token wajib dikirim" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
      if (err) {
        console.error("VERIFY ERROR:", err);
        return res.status(401).json({ message: "Refresh token tidak valid" });
      }

      const newAccessToken = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.json({
        message: "Access token diperbarui",
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    console.error("REFRESH ERROR:", error);
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
