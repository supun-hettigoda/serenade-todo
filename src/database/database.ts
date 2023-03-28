import { Connection } from "postgresql-client";

const getConnection = () => {
    const connection = new Connection({
        host: process.env.DB_HOST,
        port: parseInt(<string>process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
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
