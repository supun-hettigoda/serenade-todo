import { load } from './taskRepository'

// this test suits depends on the init data.
describe('Task repository tests', () => {

    describe('Load all', () => {
        it('no filter', async () => {
            const tasks = await load();
            expect(tasks.totalCount).toBe(9);
            expect(tasks.tasks.length).toBe(9);
        });

        it('empty filter', async () => {
            const tasks = await load({});
            expect(tasks.totalCount).toBe(9);
            expect(tasks.tasks.length).toBe(9);
        });

        it('empty title', async () => {
            const tasks = await load({ title: "" });
            expect(tasks.totalCount).toBe(9);
            expect(tasks.tasks.length).toBe(9);
        });
    })

    describe('Load by title tests', () => {
        it('when match at start', async () => {
            const tasks = await load({ title: "Deploy" });
            expect(tasks.totalCount).toBe(2);
            expect(tasks.tasks.length).toBe(2);
            expect(tasks.tasks[0].title).toMatch(/deploy/i);
        });

        it('when match at middle', async () => {
            const tasks = await load({ title: "unit" });
            expect(tasks.totalCount).toBe(1);
            expect(tasks.tasks.length).toBe(1);
        });

        it('when match at end', async () => {
            const tasks = await load({ title: "testing" });
            expect(tasks.totalCount).toBe(2);
            expect(tasks.tasks.length).toBe(2);
        });

        it('when match anywhere', async () => {
            const tasks = await load({ title: "test" });
            expect(tasks.totalCount).toBe(3);
            expect(tasks.tasks.length).toBe(3);
        });

        it('when no match', async () => {
            const tasks = await load({ title: "something not exist" });
            expect(tasks.totalCount).toBe(0);
            expect(tasks.tasks.length).toBe(0);
        });

        it('when white sapce', async () => {
            const tasks = await load({ title: "Deploy to" });
            expect(tasks.totalCount).toBe(2);
            expect(tasks.tasks.length).toBe(2);
        });

        it('verify case insensitive match', async () => {
            const tasks = await load({ title: "dePloy to" });
            expect(tasks.totalCount).toBe(2);
            expect(tasks.tasks.length).toBe(2);
        });

        it('full match', async () => {
            const tasks = await load({ title: "Review copy" });
            expect(tasks.totalCount).toBe(1);
            expect(tasks.tasks.length).toBe(1);
        });
    });
});
