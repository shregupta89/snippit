
import { Request, Response, NextFunction } from 'express';

const asyncHandler = (requestHandler: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve( requestHandler(req, res, next) ).
        catch(error => next(error)) 
    }
}


export default asyncHandler;

// this asyncHandler function is a middleware wrapper used in Express.js to handle errors in asynchronous route handlers without writing try/catch blocks everywhere.
//Passes the error to Express’s built-in error handler using next(error)

// const asyncHandler = (requestHandler) => {
//     return (req , res , next) => {
//         Promise.resolve( requestHandler(req, res, next) ).
//         catch(error => next(error)) 
//     }
// }