import express from "express";
import { 
  getUsers,
  registerUser,
  deactivateUser,
  getProfile
} from "../../controller/userscontroller.js";
import { verifyToken, onlyAdmin } from "../middleware/authorization.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);

router.post("/register", verifyToken, onlyAdmin, registerUser);

router.put("/deactivate-user", verifyToken, onlyAdmin, deactivateUser);

router.get("/", verifyToken, onlyAdmin, getUsers);

export default router;
