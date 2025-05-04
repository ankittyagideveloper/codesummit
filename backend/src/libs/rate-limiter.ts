import { ApiError } from "@/utils/apiError";
import rateLimit from "express-rate-limit";

export const limitter = (limit: number, minute: number) => rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: new ApiError(429, "Too many request"),
});