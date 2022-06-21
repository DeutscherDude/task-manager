import { NextFunction, Request, Response } from 'express';

export const verifyBody = async (req: Request, res: Response, next: NextFunction) => {
    if (await checkRouteRequirements(req)){
        next();
    }
}

async function checkRouteRequirements(req: Request): Promise<boolean> {


    return true;
}
