import { verifyBody } from '../requestVerifier';
import { Request, Response, NextFunction } from 'express';

describe('requestVerifier tests', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let next: NextFunction = jest.fn();

    beforeEach(async () => {
        mockReq = {

        }
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('should return status code 400 if the body does not meet requirements', async () => {
        verifyBody(mockReq as Request, mockRes as Response, next);
        expect(mockRes.status).toBeCalledWith(400);
        expect(next).not.toBeCalled();
    })

})
