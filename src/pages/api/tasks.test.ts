import { NextApiRequest, NextApiResponse } from "next";

// mocking task repo
jest.mock('./dao/taskRepository');

import { load } from "./dao/taskRepository";
import handler from "./tasks";

describe('/api/tasks endpoint handler test suit', () => {
    var req: NextApiRequest;
    var mockedRes: NextApiResponse;

    beforeEach(() => {
        req = { method: 'GET', body: '' } as NextApiRequest;
        /** Mocked response object */
        mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            end: jest.fn()
        } as unknown as jest.Mocked<NextApiResponse>;

        // loadAll beign mocked here to return 2 tasks
        (load as jest.Mock).mockReturnValue(Promise.resolve({
            tasks: [{ id: 'id-1', title: 'title-1', done: false }, { id: 'id-2', title: 'title-2', done: true }],
            totalCount: 2
        }));
    });

    describe('Request validation tests', () => {
        function invalidRequestExpectations(mockedRes: NextApiResponse<any>, status: number) {
            expect(mockedRes.status).toHaveBeenCalledWith(status);
            expect(mockedRes.json).toHaveBeenCalledTimes(0);
            expect(mockedRes.end).toHaveBeenCalledTimes(1);
        }

        it('enforce get', async () => {
            req.method = "POST"
            await handler(req, mockedRes);
            invalidRequestExpectations(mockedRes, 405);
        })

        it.each(['<', '>', '&', '|', '@', '#', '+', '!'])('no special charactors', async (notAllowed) => {
            // see TASK_TITLE_ALLOW_PATTERN
            req.query = { filter: 'safsdf ' + notAllowed }
            await handler(req, mockedRes);
            invalidRequestExpectations(mockedRes, 400);
        })

        it('enforce max length to title filter', async () => {
            // 100 at the moment change TASK_TITLE_FILTER_INPUT_MAX_LENGTH 
            req.query = { filter: 'jfasdghjagsjhghjsdgfgsdfg sadfsd sdfgdsfg  sdrgd jhskgfjh jhagfhjs a jashdfjhasjhgjhk asdgfsdfg sdfgsdf gdsfg' }
            await handler(req, mockedRes);
            invalidRequestExpectations(mockedRes, 400);
        })
    });

    it('filter param not present or empty must return all tasks', async () => {
        req.query = { filter: '' }
        await handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenCalledWith(200);
        expect(mockedRes.json).toHaveBeenCalledWith({
            items: [{ id: 'id-1', title: 'title-1', done: false }, { id: 'id-2', title: 'title-2', done: true }],
            pagination: { totalCount: 2 }
        });
    });

    it('whitespaces are trimmed to return all', async () => {
        req.query = { filter: '         ' }
        await handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenCalledWith(200);
        expect(mockedRes.json).toHaveBeenCalledWith({
            items: [{ id: 'id-1', title: 'title-1', done: false }, { id: 'id-2', title: 'title-2', done: true }],
            pagination: { totalCount: 2 }
        });
    })
});


