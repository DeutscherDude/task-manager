import { StatusCodes } from '../../util/statusCodes';
import { getUsers, getUserById, createUser, deleteUserById } from "../usersController";
jest.mock('express');


describe("getUsers", () => {
    let mockReq: any
    let mockRes: any;

    beforeEach(() => {
        mockReq = {};
        mockRes = {
            status: jest.fn((num: Number) => {

            }).mockReturnThis(),
            json: jest.fn((...r) => {
                return mockRes;
            }).mockReturnThis()
        };
    });

    it("should return an array of users", async () => {
        new Promise(() => {
            getUsers(mockReq, mockRes)
        }).then(() => {
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
            expect(mockRes.json).toHaveBeenCalled();
        })
    });

    it('should return a single user', async () => {
        mockReq = {
            params: {
                id: 1
            }
        }
        new Promise(() => {
            getUserById(mockReq, mockRes)
        }).then(() => {
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
            expect(mockRes.json).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith({
                user_id: 1,
                name: 'Stefan',
                password: 'JakubIsLebowski'
            });
        });
    }
    );

    it('should create a user', async () => {
        mockReq = {
            body: {
                name: 'Gejwid',
                password: 'password'
            }
        }

        new Promise(() => {
            createUser(mockReq, mockRes);
        }).then(() => {
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.CREATED);
            expect(mockRes.json).toHaveBeenCalled();
        });
    });

    it('should delete a user by id', async () => {
        mockReq = {
            params: {
                id: 4
            }
        }
        new Promise(() => {
            deleteUserById(mockReq, mockRes);
        }).then(() => { 
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.ACCEPTED);
        })
    })
}
);
