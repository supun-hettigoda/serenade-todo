import { withDatabaseConnection } from "../../../database/database";

export const loadAll = async () => {
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
        };
    });
};
