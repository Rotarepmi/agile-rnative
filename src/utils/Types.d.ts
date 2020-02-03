export interface Column {
    id: string;
    name: string
    tasks: {
        id: string;
        name: string;
        temporary?: boolean;
    }[]
}