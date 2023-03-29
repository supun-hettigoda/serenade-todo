import type { NextApiRequest, NextApiResponse } from 'next'
import { load } from './dao/taskRepository';
import { query, validationResult } from 'express-validator';

const TASK_TITLE_ALLOW_PATTERN: RegExp = /^[a-zA-Z0-9\s-_]*$/;
const TASK_TITLE_MAX_LENGTH: number = 80; // reasonable safety over title inputs

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

        await query('filter').isString()
            .isLength({ max: TASK_TITLE_MAX_LENGTH })
            .matches(TASK_TITLE_ALLOW_PATTERN)
            .run(req)
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.status(400).end();
            return;
        }

        const { filter } = req.query;
        const data: { tasks: Task[], totalCount: number } = await load({ title: filter as string });
        res.status(200).json({
            items: data.tasks,
            totalCount: data.totalCount,
        });
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
