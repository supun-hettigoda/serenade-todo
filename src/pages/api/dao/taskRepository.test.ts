import { loadAll as loadAllTasks, loadByTitle } from './taskRepository'

// this test suits depends on the init data.
describe('Task repository tests', () => {

    it('load all tasks', async () => {
        const tasks = await loadAllTasks();
        expect(tasks.totalCount).toBe(9);
        expect(tasks.tasks.length).toBe(9);
    });

    describe('Load by title tests', () => {
        it('when empty match to all', async () => {
            const tasks = await loadByTitle("");
            expect(tasks.totalCount).toBe(9);
            expect(tasks.tasks.length).toBe(9);
        });

        it('when match at start', async () => {
            const tasks = await loadByTitle("Deploy");
            expect(tasks.totalCount).toBe(2);
            expect(tasks.tasks.length).toBe(2);
            expect(tasks.tasks[0].title).toMatch(/deploy/i);
        });

        it('when match at middle', async () => {
            const tasks = await loadByTitle("unit");
            expect(tasks.totalCount).toBe(1);
            expect(tasks.tasks.length).toBe(1);
        });

        it('when match at end', async () => {
            const tasks = await loadByTitle("testing");
            expect(tasks.totalCount).toBe(2);
            expect(tasks.tasks.length).toBe(2);
        });

        it('when match anywhere', async () => {
            const tasks = await loadByTitle("test");
            expect(tasks.totalCount).toBe(3);
            expect(tasks.tasks.length).toBe(3);
        });

        it('when no match', async () => {
            const tasks = await loadByTitle("something not exist");
            expect(tasks.totalCount).toBe(0);
            expect(tasks.tasks.length).toBe(0);
        });

        it('when white sapce', async () => {
            const tasks = await loadByTitle("Deploy to");
            expect(tasks.totalCount).toBe(2);
            expect(tasks.tasks.length).toBe(2);
        });

        it('verify case insensitive match', async () => {
            const tasks = await loadByTitle("dePloy to");
            expect(tasks.totalCount).toBe(2);
            expect(tasks.tasks.length).toBe(2);
        });

        it('full match', async () => {
            const tasks = await loadByTitle("Review copy");
            expect(tasks.totalCount).toBe(1);
            expect(tasks.tasks.length).toBe(1);
        });
    });
});
