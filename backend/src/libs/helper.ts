import { env } from "@/validators/env"
import axios from "axios"

export interface Submissions {
    source_code: string,
    language_id: string,
    stdin: string,
    expected_output: string
}

export interface submissionsResponse {
    token: string
}

export interface submissionBatchResult {
    language_id: number,
    stdout: string,
    status_id: number,
    stderr: string | null,
    token: string
}

export const getJudge0LanguageId = (language: string) => {

    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63
    }

    return languageMap[language.toUpperCase() as keyof typeof languageMap]

}

export const submitBatch = async (submissions: Submissions) => {
    const { data }: { data: submissionsResponse[] } = await axios.post(`${env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, { submissions })

    return data
}

const sleep = (ms: number) => {
    return new Promise((resolver) => setTimeout(resolver, ms))
}

export const poolBatchResults = async (tokens: string[]) => {

    while (true) {
        const { data } = await axios.get(`${env.JUDGE0_API_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(",")
            }
        })

        const results: submissionBatchResult[] = data.submissions

        const isAllDone = results.every((r) => r.status_id !== 1 && r.status_id !== 2)

        if (isAllDone) return results

        await sleep(1000)
    }

}