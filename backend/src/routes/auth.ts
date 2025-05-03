import { getLogin, getLogout, getUser, registerUser } from "@/controllers/auth";
import { isAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validator";
import { loginSchema, newUserSchema } from "@/validators/validationSchema";
import { Router } from "express";

export const router = Router()

router.post("/", validate(newUserSchema), registerUser)
router.get("/", isAuth, getUser)
router.post("/login", validate(loginSchema), getLogin)
router.post("/logout", isAuth, getLogout)