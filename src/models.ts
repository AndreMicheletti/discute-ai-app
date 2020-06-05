
export type DefinitionObject = {
    title: string,
    text: string,
    imageUrl: string,
    color: string,
    tags: string[],
    likes: number,
    dislikes: number,
    references: string[],
    faq: string[],
    featured: boolean,
    source: string
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

export type FirebaseDefinition = {
    id: string,
    title: string,
    text: string,
    imageUrl: string,
    color: string,
    tags: string[],
    likes: number,
    dislikes: number,
    references: string[],
    faq: string[],
    featured: boolean
}

export interface FirebaseData {
    id: string,
    data(): () => FirebaseDefinition
}
