import { Router } from "express";

import {
  getAllUsers,
  registerUser,
  loginUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/new", registerUser);
router.post("/login", loginUser);

export default router;
