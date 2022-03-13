import nano from "nano";

interface IUser extends nano.MaybeDocument {
    _id: string
    _rev: string
    name: string
    email: string
    dob: Date
    password: string,
    roles: Array<string>
}

class User implements IUser {
    _id: string
    _rev: string
    name: string
    email: string
    dob: Date
    password: string
    roles: Array<string>
    
    constructor(_id: string, _rev: string, name: string, email: string, dob: Date, password: string, roles: Array<string>) {
        this._id = _id;
        this._rev = _rev;
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}

export default User;
