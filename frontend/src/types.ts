export type Task = {
    id: string;
    user_id: string | null;
    title: string;
    description: string;
    status: string;
};

export type Project = {
    id: string | undefined;
    name: string;
    description: string;
    status: string;
};
