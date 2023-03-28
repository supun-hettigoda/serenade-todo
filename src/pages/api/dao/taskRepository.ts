import { withDatabaseConnection } from "../../../database/database";
import { DataTypeOIDs, QueryResult } from 'postgresql-client';

export const loadAll = async () => {
    return withDatabaseConnection(async (connection) => {
        const tasksQueryResult = await connection.query(
            'SELECT id, title, done ' +
            'FROM tasks ' +
            'ORDER BY id ASC');
        return mapTaskProperties(tasksQueryResult);
    });
};

export const loadByTitle = async (title: String) => {
    return withDatabaseConnection(async (connection) => {
        const statement = await connection.prepare(
            "SELECT id, title, done " +
            "FROM tasks " +
            "WHERE title ilike $1 " +
            "ORDER BY id ASC",
            { paramTypes: [DataTypeOIDs.varchar] });

        const tasksQueryResult = await statement.execute({ params: ["%" + title + "%"] });
        await statement.close();
        return mapTaskProperties(tasksQueryResult);
    });
};

function mapTaskProperties(tasksQueryResult: QueryResult) {
    const tasks = tasksQueryResult.rows?.map(row => ({
        id: row[0],
        title: row[1],
        done: row[2],
    })) || [];

    return {
        tasks,
        totalCount: tasks?.length || 0
    };
}

