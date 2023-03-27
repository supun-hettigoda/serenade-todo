import type {NextApiRequest, NextApiResponse} from 'next'
import {withDatabaseConnection} from "../../database/database";

//
// This API route can be called as PUT /api/done
// It takes two query params ('taskId' and 'done')
// It marks a task as done or pending (depending on done == 'true' or 'false')
//

const setTaskDone = async (taskId: number, done: boolean) => {
    return withDatabaseConnection(async (connection) => {
        await connection.query(`update tasks set done = ${done} where id = ${taskId}`);
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method !== 'PUT') {
            res.status(405).end();
            return;
        }
        const {taskId, done} = req.query;

        await setTaskDone(Number(taskId as string), done === 'true');

        res.status(204).end();
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
