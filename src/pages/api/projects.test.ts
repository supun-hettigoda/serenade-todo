import { NextApiRequest, NextApiResponse } from "next";

// mocking project repo
jest.mock('./dao/projectRepository');

import { load } from "./dao/projectRepository";
import handler from "./projects";

describe('/api/projects endpoint handler test suit', () => {
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

        // loadAll beign mocked here to return 2 projects
        (load as jest.Mock).mockReturnValue(Promise.resolve({
            projects: [{ id: 'id-1', name: 'project-1', tasks: [] }, { id: 'id-2', name: 'project-2', tasks: [] }],
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
    });

    it('verify fetch all invoked and results mapped to the response', async () => {
        await handler(req, mockedRes);

        expect(mockedRes.status).toHaveBeenCalledWith(200);
        expect(mockedRes.json).toHaveBeenCalledWith({
            items: [{ id: 'id-1', name: 'project-1', tasks: [] }, { id: 'id-2', name: 'project-2', tasks: [] }],
            pagination: { totalCount: 2 }
        });
    });
});


