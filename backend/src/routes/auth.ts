import { getLogin, getLogout, getUser, registerUser } from "@/controllers/auth";
import { isAuth } from "@/middlewares/auth";
import { Router } from "express";

export const router = Router()

router.post("/", registerUser)
router.get("/", isAuth, getUser)
router.post("/login", getLogin)
router.post("/logout", isAuth, getLogout)