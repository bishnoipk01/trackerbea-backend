import { Router } from "express";

import {
  getAllUsers,
  createUser,
  loginUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/", getAllUsers);
router.post("/new", createUser);
router.post("/login", loginUser);

export default router;
