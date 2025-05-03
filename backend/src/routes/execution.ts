import { executeCode } from "@/controllers/execution";
import { isAuth } from "@/middlewares/auth";
import { validate } from "@/middlewares/validator";
import { executeCodeSchema } from "@/validators/validationSchema";
import { Router } from "express";

export const router = Router()

router.post("/", isAuth, validate(executeCodeSchema), executeCode)