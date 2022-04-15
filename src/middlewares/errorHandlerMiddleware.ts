import { Request, Response, NextFunction } from 'express';

function errorHandlerMiddleware(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error.type === 'not_found') {
        return res.sendStatus(404);
    }

    return res.sendStatus(500);
}

export default errorHandlerMiddleware;
