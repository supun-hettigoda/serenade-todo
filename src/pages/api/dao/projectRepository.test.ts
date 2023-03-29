import { load } from './projectRepository'

// this test suits depends on the init data.
describe('Task repository tests', () => {
    describe('Load all', () => {
        it('verify the count', async () => {
            const projects = await load();
            expect(projects.totalCount).toBe(2);
            expect(projects.projects.length).toBe(2);
        });

        it('verify mapped project properties', async () => {
            const projects: { projects: Project[], totalCount: number } = await load();

            // project salsa 
            const expectedProject_0 = {
                id: 1,
                name: 'Project Salsa',
                // match just known 3 tasks
                tasks: expect.arrayContaining([
                    { id: 1, title: 'Finish logo', done: true },
                    { id: 4, title: 'Review copy', done: true },
                    { id: 6, title: 'Deploy to production', done: false }
                ])
            }
            // project tango
            const expectedProject_1 = {
                id: 2,
                name: 'Project Tango',
                // match just known 2 tasks
                tasks: expect.arrayContaining([
                    { id: 7, title: 'Smoke testing', done: false },
                    { id: 9, title: 'Load testing', done: false }
                ])
            }
            expect(projects.projects[0]).toEqual(expectedProject_0);
            expect(projects.projects[1]).toEqual(expectedProject_1);
        });

        it('verify tasks order', async () => {
            const projects: { projects: Project[], totalCount: number } = await load();
            // project salsa 
            const expectedProject_0 = {
                id: 1,
                name: 'Project Salsa',
                // match just known 3 tasks
                tasks: ([
                    expect.objectContaining({ id: 1 }),
                    expect.objectContaining({ id: 2 }),
                    expect.objectContaining({ id: 3 }),
                    expect.objectContaining({ id: 4 }),
                    expect.objectContaining({ id: 5 }),
                    expect.objectContaining({ id: 6 }),
                ])
            }
            expect(projects.projects[0]).toEqual(expectedProject_0);
        });
    });

    it('projects should return by inserted order', async () => {
        const projects: { projects: Project[], totalCount: number } = await load();
        expect(projects.projects[0]).toEqual({ id: 1, name: 'Project Salsa', tasks: expect.arrayContaining([]) });
        expect(projects.projects[1]).toEqual({ id: 2, name: 'Project Tango', tasks: expect.arrayContaining([]) });
    });
});