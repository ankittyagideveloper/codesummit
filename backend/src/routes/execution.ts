import { executeCode } from "@/controllers/execution";
import { isAuth } from "@/middlewares/auth";
import { Router } from "express";

export const router = Router()

router.post("/", isAuth, executeCode)