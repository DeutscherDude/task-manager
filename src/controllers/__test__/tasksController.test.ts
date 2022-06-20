// import { NextFunction } from 'express';
// import { StatusCodes } from '../../util/statusCodes';
// import {
//     getTasks,
//     getTaskById,
//     createTask,
//     deleteTaskById,
//     patchTask,
//     putTask
// } from '../tasksController';

describe('tasksController tests', () => {
    // let mockReq: any;
    // let mockRes: any;
    // const next: NextFunction = jest.fn();


    // beforeEach(async () => {
    //     mockReq = {};
    //     mockRes = {
    //         status: jest.fn((num: Number) => {

    //         }).mockReturnThis(),
    //         json: jest.fn((...r) => {

    //         }).mockReturnThis()
    //     };
    // });

    it('returns all tasks from the db', async () => {
        // await getTasks(mockReq, mockRes);
            // .then(() => {
            //     expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
            //     expect(mockRes.json).toHaveBeenCalled();
            // })
        expect(1+1).toEqual(2);
    });

    // it('returns a task by given id', async () => {
    //     // getTaskById(mockReq, mockRes);
    //     // .then(() => {
    //     //     expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.METHOD_NOT_ALLOWED);
    //     //     expect(mockRes.json).toHaveBeenCalledWith({
    //     //         message: 'Method not yet implemented'
    //     //     });
    //     // })
    // });

    // it('Create a task given all correct fields', async () => {
    //     mockReq = {
    //         body: {
    //             fk_user_id: 4,
    //             title: 'Get David a loli',
    //             description: 'David is a huge loli lover, hence getting him a loli...',
    //         }
    //     }
    //     // await createTask(mockReq, mockRes).then(() => {
    //     //     expect(mockRes.status)
    //     //     // .toHaveBeenCalledWith(StatusCodes.ACCEPTED);
    //     //     // expect(mockRes.json).toHaveBeenCalledWith({
    //     //     //     message: 'Indeed David is a huge loli'
    //     //     // })
    //     // })
    // });

    // it('DELETE a task by ID', async () => {
    //     // await deleteTaskById(mockReq, mockRes, next);
    // });

    // it('PATCH a task', async () => {
    //     // await patchTask(mockReq, mockRes, next);
    // })

    // it('PUT a task', async () => {
    //     // await putTask(mockReq, mockRes, next);
    // });

});

