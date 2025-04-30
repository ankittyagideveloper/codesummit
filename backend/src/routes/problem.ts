import { createProblem, getAllProblem, getAproblem, updateProblem, deleteProblem, getSolvedProblem } from "@/controllers/problem";
import { isAdmin, isAuth } from "@/middlewares/auth";
import { Router } from "express";

export const router = Router()

router.use(isAuth)

router.post("/", isAdmin, createProblem)
router.get("/", getAllProblem)
router.get("/:problemId", getAproblem)
router.patch("/:problemId", isAdmin, updateProblem)
router.delete("/:problemId", isAdmin, deleteProblem)
router.get("/get-solved-problem", getSolvedProblem)