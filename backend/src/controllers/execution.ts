import { poolBatchResults, Submissions, submitBatch } from "@/libs/helper";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";

export const executeCode = asyncHandler(async (req: Request, res: Response) => {
    const { source_code, language_id, stdin, expected_outputs, problemId } = req.body

    if (stdin.length === 0 || expected_outputs.length !== stdin.length) {
        throw new ApiError(400, "Invalid or missing test cases")
    }

    const submissions = stdin.map((input: string) => ({
        source_code,
        language_id: Number(language_id),
        stdin: input,
    })) as Submissions[]

    const submitResponse = await submitBatch(submissions)

    const tokens = submitResponse.map((res) => res.token)

    const results = await poolBatchResults(tokens)

    console.log(results)

    res.status(200).json(new ApiResponse(200, "Code is executed"))
})