import { withDatabaseConnection } from "../../../database/database";
import { DataTypeOIDs, QueryResult } from 'postgresql-client';

export const load = async (filters?: { title?: String }): Promise<{ tasks: Task[], totalCount: number }> => {
    return withDatabaseConnection(async (connection) => {
        let SQL: string = "SELECT id, title, done " + "FROM tasks ";
        if (filters?.title) {
            SQL = SQL + "WHERE title ilike $1 ";
        }
        SQL = SQL + "ORDER BY id ASC";

        const statement = await connection.prepare(SQL, { paramTypes: [DataTypeOIDs.varchar] });
        const tasksQueryResult = await statement.execute({ params: ["%" + filters?.title + "%"] });
        await statement.close();
        return mapTaskProperties(tasksQueryResult);
    });
};

function mapTaskProperties(tasksQueryResult: QueryResult): { tasks: Task[], totalCount: number } {
    const tasks: Task[] = tasksQueryResult.rows?.map(row => ({
        id: row[0],
        title: row[1],
        done: row[2],
    } as Task)) || [];

    return {
        tasks,
        totalCount: tasks?.length || 0
    };
};

