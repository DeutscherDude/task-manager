
export const mockTasksController = {
    getTasks: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            message: 'Tasks fetched successfully'
        })
    },
    getTaskById: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    },
    createTask: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    },
    deleteTaskById: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    },
    patchTask: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    },
    putTask: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    }
}

export const mockUsersController = {
    getUsers: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    },
    getUserById: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    },
    createUser: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    },
    deleteUserById: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    },
    patchUser: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    },
    putUser: (mockReq: any, mockRes: any) => {
        mockRes.status(200).json({
            
        })
    }
}