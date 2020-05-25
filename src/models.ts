
export type DefinitionObject = {
    references: string[],
    imageUrl: string,
    faq: string[],
    title: string,
    color: string,
    likes: number,
    dislikes: number,
    featured: boolean
}

export type DefinitionResponse = {
    _index: string,
    _type: string,
    _id: string,
    _score: number,
    _source: DefinitionObject
}

export interface DefinitionStore {
    [key: string]: DefinitionResponse
}
