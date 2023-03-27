import type {NextApiRequest, NextApiResponse} from 'next'
import {withDatabaseConnection} from "../../database/database";

//
// This API route can be called as GET /api/tasks
// It returns the list of all tasks in the app
// It takes an optional query param 'filter', which can be used to filter
// out tasks based on their title (TODO!)
//


const getTasksFromDatabase = async () => {
    return withDatabaseConnection(async (connection) => {
        const tasksQueryResult = await connection.query('select id, title, done from tasks order by id asc');
        const countResult = await connection.query('select count(*) from tasks');

        const tasks = tasksQueryResult.rows?.map(row => ({
            id: row[0],
            title: row[1],
            done: row[2],
        })) || [];

        return {
            tasks,
            totalCount: countResult.rows![0][0]
        }
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<TasksResponse>
) {
    try {
        if (req.method !== 'GET') {
            res.status(405).end();
            return;
        }

        const {filter} = req.query;

        const data = await getTasksFromDatabase();

        res.status(200).json({
            items: data.tasks,
            totalCount: data.totalCount,
        });
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
