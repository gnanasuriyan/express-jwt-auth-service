import User from "src/models/user.model";

export default interface IUserRepository {
    findUserByEmail(email: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}
