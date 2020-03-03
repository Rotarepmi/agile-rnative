export interface Column {
    id: string;
    name: string
    tasks: {
        id: string;
        name: string;
        creator: string;
        assignedUser: string;
    }[]
}

export interface Project {
    id: string;
    name: string;
    description: string;
    owner: string;
    users: { id: string, name: string }[];
}