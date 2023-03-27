import {Connection} from "postgresql-client";


const getConnection = () => {
    const connection = new Connection({
        host: 'localhost',
        port: 5432,
        user: 'serenade',
        password: 'serenade',
        database: 'serenade',
        connectTimeoutMs: 5000,
    });

    return connection;
};

type Callback<T> = (connection: Connection) => Promise<T>;

export const withDatabaseConnection = async <T>(callback: Callback<T>): Promise<T> => {
    const connection = getConnection();
    await connection.connect();
    let result
    try {
         result = await callback(connection);
    } finally {
        await connection.close();
    }
    return result;
}
