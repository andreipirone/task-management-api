export type Task = {
    id: string;
    user_id: string;
    title: string;
    description: string;
    status: 'open' | 'in_progress' | 'closed';
};
