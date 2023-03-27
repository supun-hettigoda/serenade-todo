import type {NextApiRequest, NextApiResponse} from 'next'
import {withDatabaseConnection} from "../../database/database";

//
// This API route can be called as GET /api/projects
// It returns the list of all projects in the app, along with each project's tasks
//

/**
 * Get all projects from the database.
 * It doesn't fill each project's tasks - instead it leaves an empty array
 */
const getProjectsFromDatabase = async () => {
    return withDatabaseConnection(async (connection) => {
        const projectsQueryResult = await connection.query('select id, name from projects order by id asc');
        const countResult = await connection.query('select count(*) from projects');

        const projects = projectsQueryResult.rows?.map(row => ({
            id: row[0],
            name: row[1],
            tasks: [] as Task[],
        })) || [];

        return {
            projects,
            totalCount: countResult.rows![0][0]
        }
    });
}

/**
 * Fetch the tasks for a given project from the database
 */
const getTasksForProject = async (projectId: number): Promise<Task[]> => {
    return withDatabaseConnection(async (connection) => {
        const tasksQueryResult = await connection.query(`select id, title, done from tasks where project_id = ${projectId}`);

        return tasksQueryResult.rows?.map(row => ({
            id: row[0],
            title: row[1],
            done: row[2],
        })) || [];
    });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProjectsResponse>
) {
    try {
        if (req.method !== 'GET') {
            res.status(405).end();
            return;
        }

        // Fetch the list of all projects from the database
        const data = await getProjectsFromDatabase();

        // For each project, fetch its list of tasks
        for (let i = 0; i < data.projects.length; i++) {
            data.projects[i].tasks = await getTasksForProject(data.projects[i].id)
        }

        res.status(200).json({
            totalCount: data.totalCount,
            items: data.projects,
        });
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
