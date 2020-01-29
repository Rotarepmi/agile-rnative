export interface Column {
    id: string;
    name: string
    tasks: {
        id: string;
        title: string;
        temporary?: boolean;
    }[]
}