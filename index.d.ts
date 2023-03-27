interface Task {
    id: number,
    title: string,
    done: boolean,
}

interface Project {
    id: number,
    name: string,
    tasks: Task[],
}

interface TasksResponse {
    items: Task[],
    totalCount: number,
}

interface ProjectsResponse {
    items: Project[],
    totalCount: number,
}
