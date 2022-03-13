import { container, inject, singleton } from "tsyringe";

import User from "../models/user.model";
import AppLogger from "../utils/logger";
import UserRepository from "../repositories/user.repository";

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

@singleton()
class PassportJWTStategy {
    constructor(
        @inject(AppLogger) public appLogger: AppLogger,
        @inject(UserRepository) public userRepo: UserRepository
    ) {
    }

    public setup(passport: any): any {
        const jwtStrategy = new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey   : process.env.JWT_SECRET
        }, (jwtPayload: any, done: Function) => {
            this.userRepo.findUserByEmail(jwtPayload.email).then((user: User) => {
                this.appLogger.instance.info(`passport - extracting user details based on jwt email ${jwtPayload.email}`);
                return done(null, user);
            }).catch(err => {
                this.appLogger.instance.error(`passport - finding user with ${jwtPayload.email} was failed. ${err.message}`);
                return done(new Error('user doesn\'t exist'), false, { message: err.message });
            });
        });
        passport.use(jwtStrategy);
    }
}

container.registerSingleton<PassportJWTStategy>(PassportJWTStategy);
export default PassportJWTStategy;
