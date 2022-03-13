import bcrypt from "bcryptjs";
import { container, inject, singleton } from "tsyringe";

import User from "../models/user.model";
import AppLogger from "../utils/logger";
import UserRepository from "../repositories/user.repository";

const LocalStrategy = require('passport-local').Strategy;

@singleton()
class PassportLocalStrategy {
    constructor(
        @inject(AppLogger) public appLogger: AppLogger,
        @inject(UserRepository) public userRepo: UserRepository
    ) {
    }

    public setup(passport: any): any {
        const localStrategy = new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email: string, password: string, done: Function) => {
            this.appLogger.instance.info(`passport - authenticating user ${email}`);
            this.userRepo.findUserByEmail(email).then((user: User) => {
                this.appLogger.instance.info(`passport - verifying user ${user.email} password`);
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    }
                    if (isMatch) {
                        return done(null, user);
                    }
                    return done(new Error('username or password doesn\'t match'), false, { message: 'Incorrect password provided' });
                });
            }).catch(err => {
                this.appLogger.instance.error(`passport - finding user with ${email} was failed. ${err.message}`);
                return done(err, false);
            });
        });
        passport.use(localStrategy);
    }
}

container.registerSingleton<PassportLocalStrategy>(PassportLocalStrategy);
export default PassportLocalStrategy;
