export interface Tag {
    id: number;
    name: string;
}

export interface Task {
    id: number;
    userId: number;
    taskDate: string;
    taskTime: string | null;
    description: string;
    tags: Tag[];
}
