import { container, inject, singleton } from "tsyringe";
import { Response } from "express";
import AppLogger from "../utils/logger";
import UserRepository from "../repositories/user.repository";
import IUserController from "./user.controller.type";

const passport = require('passport');
const jwt      = require('jsonwebtoken');

@singleton()
class UserController implements IUserController {
    constructor(
        @inject(AppLogger) public appLogger: AppLogger,
        @inject(UserRepository) public userRepo: UserRepository,
    ) {
    }

    login(req: any, res: Response): void {
        passport.authenticate('local', {session: false}, (err: any, user: any) => {
            console.log(err);
            if (err || !user) {
                return res.status(400).json({
                    status: false,
                    message: err ? err.message : 'Login failed',
                });
            }
            const token = jwt.sign({email: user.email, iat: new Date().getTime()}, process.env.JWT_SECRET);
            this.appLogger.instance.info(`successfully authenticated the user ${user.email}`);
            return res.json({status: true, token});
        })(req, res);
    }
    
    logout(req: any, res: Response): void {
        const user: any = req.user || {};
        this.appLogger.instance.info(`the user ${user.email || ''} was successfully logged out`);
        res.send({status: true});
    }

    getUserDetails(req: any, res: Response): void {
        const user: any = req.user;
        delete user.password;
        res.send({status: true, data: user});
    }
}

container.registerSingleton<UserController>(UserController);

export default UserController;
