export type History = {
    userIds: number[];
    sessionId: string;
    completed: CompletedQuestion[];
    date: Date;
}

export type CompletedQuestion = {
    questionId: string;
    answer: string;
    result: string;
    completedAt: Date;
}