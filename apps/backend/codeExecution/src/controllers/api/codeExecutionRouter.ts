import { Router, NextFunction, Request, Response } from "express";
import axios from "axios";

export const codeExecutionRouter = Router();

// Compiles a batch of submissions
codeExecutionRouter.post("/compile", async (req: Request, res: Response, next: NextFunction) => {
    const { submissions } = req.body;

    console.log("req.body: ", req.body)
    const options = {
        method: "POST",
        url: process.env.RAPID_API_SUBMISSIONS_URL + "/batch",
        params: { base64_encoded: "true", fields: "*" },
        headers: {
        "content-type": "application/json",
        "X-RapidAPI-Host": process.env.RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        },
        data: {
            submissions
        },
    };

    try {
        const response = await axios.request(options);
        console.log("res.json({ token }): ", response.data)
        res.json( response.data );
    } catch (err) {
        res.status(500).json(err);
    }
});

// Check status of compilation
codeExecutionRouter.get("/status/:token", async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const options = {
        method: "GET",
        url: `${process.env.RAPID_API_SUBMISSIONS_URL}/${token}`,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
        "X-RapidAPI-Host": process.env.RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        },
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (err) {
        res.status(500).json(err);
    }
})

codeExecutionRouter.get("/ping", async (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "pong" });
})