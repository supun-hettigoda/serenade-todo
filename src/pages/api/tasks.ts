import type { NextApiRequest, NextApiResponse } from 'next'
import { loadAll } from './dao/taskRepository';
//
// This API route can be called as GET /api/tasks
// It returns the list of all tasks in the app
// It takes an optional query param 'filter', which can be used to filter
// out tasks based on their title (TODO!)
//
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TasksResponse>
) {
    try {
        if (req.method !== 'GET') {
            res.status(405).end();
            return;
        }

        const { filter } = req.query;

        const data = await loadAll();

        res.status(200).json({
            items: data.tasks,
            totalCount: data.totalCount,
        });
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
