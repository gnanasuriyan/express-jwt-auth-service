import { Request, Response } from "express";

export default interface IUserController {
    login(req: any, res: Response): void;
    logout(req: any, res: Response): void;
    getUserDetails(req: any, res: Response): void;
}
