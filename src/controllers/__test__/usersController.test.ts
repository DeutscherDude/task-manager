import { getUsers } from "../usersController";
import { Request, Response } from "express";
jest.mock('express');


describe("getUsers", () => {
    let mockReq: <jest.Mock<Request>>Request;
    let mockRes: Response;

    it("should return an array of users", async () => {
        await getUsers(mockReq, mockRes);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith("Task Manager App");
    }
    );
}
);


