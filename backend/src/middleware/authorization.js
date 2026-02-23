import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// ================= TOKEN CHECK =================
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token tidak ada" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token tidak valid" });
    }

    req.user = user; // simpan payload JWT ke req
    next();
  });
};

// ================= ROLE CHECK =================
// Admin only
export const onlyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Akses hanya untuk admin" });
  }
  next();
};

// Kasir only
export const onlyKasir = (req, res, next) => {
  if (req.user.role !== "kasir") {
    return res.status(403).json({ message: "Akses hanya untuk kasir" });
  }
  next();
};

// Pelanggan only
export const onlyPelanggan = (req, res, next) => {
  if (req.user.role !== "pelanggan") {
    return res.status(403).json({ message: "Akses hanya untuk pelanggan" });
  }
  next();
};

// ================= KHUSUS =================
// Admin tidak boleh menonaktifkan dirinya sendiri
export const notDeactivateSelf = (req, res, next) => {
  if (req.user.id === req.body.id) {
    return res.status(403).json({
      message: "Admin tidak boleh menonaktifkan dirinya sendiri"
    });
  }
  next();
};
