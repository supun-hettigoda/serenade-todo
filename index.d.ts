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

interface TasksResponse extends PaginationItemsResponse<Tasks> { }

interface ProjectsResponse extends PaginationItemsResponse<Project> { }

interface PaginationItemsResponse<T> {
    items: T[],
    pagination: {
        totalCount: number,
        // TIDY remove the optional after pagination implemented.
        pageCount?: number,
        currentPage?: number,
        perPage?: number
    }
}