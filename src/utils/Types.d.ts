export interface Column {
    id: string;
    title: string
    tasks: {
        id: string;
        title: string;
    }[]
}