import { Request, Response, NextFunction } from 'express';

function errorHandlerMiddleware(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error.type === 'bad_request') {
        return res.sendStatus(400);
    }

    if (error.type === 'not_found') {
        return res.sendStatus(404);
    }

    if (error.type === 'conflict') {
        return res.sendStatus(409);
    }

    return res.sendStatus(500);
}

export default errorHandlerMiddleware;
