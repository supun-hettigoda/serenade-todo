import { loadAll as loadAllTasks } from './taskRepository'

describe('Task repository tests', () => {
    // this test depends on the init data.
    it('Load all tasks', async () => {
        const tasks = await loadAllTasks();
        expect(tasks.totalCount).toBe(9);
        expect(tasks.tasks.length).toBe(9)
    })
})