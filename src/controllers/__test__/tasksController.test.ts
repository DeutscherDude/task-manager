import { NextFunction } from 'express';
import { StatusCodes } from '../../util/statusCodes';
import {
    getTasks,
    getTaskById,
    createTask,
    deleteTaskById,
    patchTask,
    putTask
} from '../tasksController';

describe('tasksController tests', () => {
    let mockReq: any
    let mockRes: any;
    const next: NextFunction = jest.fn();

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn((num: Number) => {

            }
            ).mockReturnThis(),
            json: jest.fn((...r) => {
                return mockRes;
            }
            ).mockReturnThis()
        };
    });

    it('GET all tasks', async () => {
        new Promise(() => {
            getTasks(mockReq, mockRes, next)})
        .then(() => {
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.OK);
            expect(mockRes.json).toHaveBeenCalled();
        });
    });

    it('GET a task by ID', async () => {
        getTaskById(mockReq, mockRes, next);
    });

    it('POST a task', async () => {
        createTask(mockReq, mockRes, next);
    });

    it('DELETE a task by ID', async () => {
        deleteTaskById(mockReq, mockRes, next);
    });

    it('PATCH a task', async () => {
        patchTask(mockReq, mockRes, next);
    })

    it('PUT a task', async () => {
        putTask(mockReq, mockRes, next);
    });

})

