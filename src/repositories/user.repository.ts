import { MangoResponse } from "nano";
import User from "src/models/user.model";
import db from "../utils/db";
import { container, inject, singleton } from "tsyringe";
import IUserRepository from "./user.repository.type";
import AppLogger from "../utils/logger";

@singleton()
class UserRepository implements IUserRepository {
    constructor(
        @inject(AppLogger) public appLogger: AppLogger,
    ) {
        
    }
    async findUserByEmail(userEmail: string): Promise<User> {
        this.appLogger.instance.info(`findUserByEmail: ${userEmail}`);
        const q = {
            selector: {
                email: { '$eq': userEmail},
            },
            fields: ['_id', '_rev', 'name', 'email', 'dob', 'password', 'roles'],
            limit:1
        };
        const response: MangoResponse<User> = await db.find(q);
        this.appLogger.instance.info(`findUserByEmail: ${userEmail} response ${JSON.stringify(response.docs)}`);
        if (response.docs && response.docs.length > 0) {
            return response.docs[0];
        }
        throw new Error('user doesn\'t exist');
    }

    async findUserById(id: string): Promise<User> {
        const q = {
            selector: {
                email: { '_id': id},
            },
            fields: ['_id', '_rev', 'name', 'email', 'dob', 'password', 'roles'],
            limit:1
        };
        const response: MangoResponse<User> = await db.find(q);
        if (response.execution_stats && response.execution_stats.results_returned > 0) {
            return response.docs[0];
        }
        throw new Error('user doesn\'t exist');
    }
}

container.registerSingleton<UserRepository>(UserRepository);
export default UserRepository;
