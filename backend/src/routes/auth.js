import express from "express";
import { login, refreshToken, logout } from "../../controller/authcontroller.js";

const router = express.Router();
router.post("/login", login);
router.post("/logout", logout);
router.post("/refreshtoken", refreshToken);

export default router;
