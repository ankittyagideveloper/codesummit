import express, { Express } from "express";
import cookieParser from "cookie-parser";

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.status(200).json("It is up and running...")
})

// import all the routes here
import { router as authRoutes } from "@/routes/auth";
import { router as problemRoutes } from "@/routes/problem";
import { router as executionRoutes } from "@/routes/execution";
import { router as submissionRoutes } from "@/routes/submission";
import { router as playlistRoutes } from "@/routes/playlist";

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/problems", problemRoutes)
app.use("/api/v1/execute-code", executionRoutes)
app.use("/api/v1/submission", submissionRoutes)
app.use("/api/v1/playlist", playlistRoutes)

export default app