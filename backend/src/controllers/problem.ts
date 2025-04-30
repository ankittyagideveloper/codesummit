import { db } from "@/libs/db";
import { getJudge0LanguageId, poolBatchResults, Submissions, submitBatch } from "@/libs/helper";
import { ApiError } from "@/utils/apiError";
import { ApiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import { stdin } from "process";

export const createProblem = asyncHandler(async (req: Request, res: Response) => {

    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolution } = req.body

    for (const [language, solutionCode] of Object.entries(referenceSolution)) {
        const languageId = getJudge0LanguageId(language)

        if (!languageId) throw new ApiError(400, `${language} Language is not supported`)

        const submissions: Submissions = testcases.map(({ input, output }: { input: string, output: string }) => {
            return {
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output
            }
        })

        const submissionResults = await submitBatch(submissions)

        const tokens = submissionResults.map((res) => res.token)

        const results = await poolBatchResults(tokens)

        for (let i = 0; i < results.length; i++) {
            const result = results[i]

            if (result.status_id !== 3) {
                throw new ApiError(400, `Testcase ${i + 1} failed for language ${language}`)
            }
        }

    }

    const newProblem = await db.problem.create({
        data: {
            title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolution, userId: req.user!.id
        }
    })

    return res.status(201).json(new ApiResponse(201, "New problem is created", newProblem))

})

export const getAllProblem = asyncHandler(async (req: Request, res: Response) => { })

export const getAproblem = asyncHandler(async (req: Request, res: Response) => { })

export const updateProblem = asyncHandler(async (req: Request, res: Response) => { })

export const deleteProblem = asyncHandler(async (req: Request, res: Response) => { })

export const getSolvedProblem = asyncHandler(async (req: Request, res: Response) => { })

