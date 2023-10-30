export type History = {
    userIds: number[];
    sessionId: string;
    completed: CompletedQuestion[];
    date: Date;
    _id: string;
}

export type CompletedQuestion = {
    questionId: string;
    questionTitle: string;
    runTime: number;
    language: string
    answer: string;
    result: string;
    completedAt: Date;
    _id: string;
}