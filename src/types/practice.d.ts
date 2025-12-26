
export interface questionShow {
    title: string,
    options: {
        A: string,
        B: string,
        C: string,
        D: string,
        _id: string,
    },
    answer: string,
    analysis: string,
    relatedKnowledgePoints: string[],
    userSelect: string,
    key: string,
    DifficultyLevel: Number,
    similarity: any
}

export interface KnowledgeItem {
    type: string,
    label: string,
    key: string
}