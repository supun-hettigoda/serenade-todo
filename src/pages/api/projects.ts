import type { NextApiRequest, NextApiResponse } from 'next'
import { load } from './dao/projectRepository';

//
// This API route can be called as GET /api/projects
// It returns the list of all projects in the app, along with each project's tasks
//
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProjectsResponse>
) {
    try {
        if (req.method !== 'GET') {
            res.status(405).end();
            return;
        }

        // Fetch the list of all projects including mapping tasks from the database
        const data: { projects: Project[], totalCount: number } = await load();

        res.status(200).json({
            items: data.projects,
            pagination: { totalCount: data.totalCount },
        });
    } catch (e) {
        console.error(e);
        res.status(500);
    }
}
