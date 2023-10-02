import { Router } from "express";
import { login, getUser, signup } from "../services/user.service";

const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/:id", getUser);

export default router;
