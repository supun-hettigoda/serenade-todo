import { QueryResult } from "postgresql-client";
import { withDatabaseConnection } from "../../../database/database";

export const load = async (): Promise<{ projects: Project[], totalCount: number }> => {
    return withDatabaseConnection(async (connection) => {
        let SQL: string =
            "SELECT p.id, p.name, t.id, t.title, t.done " +
            "FROM projects p " +
            "LEFT JOIN tasks t on p.id=t.project_id " +
            "ORDER BY p.id, t.id ASC";

        const statement = await connection.prepare(SQL);
        const projectsQueryResult = await statement.execute();
        await statement.close();
        return mapProjectProperties(projectsQueryResult);
    });
};

function mapProjectProperties(projectsQueryResult: QueryResult): { projects: Project[], totalCount: number } {
    // group row results by project id
    // { pid: row[] }
    const mapToProjectId = projectsQueryResult.rows?.reduce(function (acc: any[], cur: any) {
        (acc[cur[0]] = acc[cur[0]] || []).push(cur);
        return acc;
    }, {});

    const projects: Project[] = [];
    Object.keys(mapToProjectId).forEach(function (projectId) {
        projects.push(mapRowsToSingleProject(mapToProjectId[projectId]));
    });

    return {
        projects,
        totalCount: projects?.length || 0
    };
};

function mapRowsToSingleProject(rows: any): Project {
    return {
        // map project id and name from the first row
        id: rows[0][0],
        name: rows[0][1],
        tasks: mapToTasks(rows)
    } as Project
}

function mapToTasks(rows: any[]): Task[] {
    return rows?.map(row => ({
        id: row[2],
        title: row[3],
        done: row[4],
    } as Task)) || [];
}

