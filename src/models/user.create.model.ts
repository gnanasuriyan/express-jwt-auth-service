import nano from "nano";

interface IUserCreate extends nano.MaybeDocument {
    name: string
    email: string
    dob: Date
    password: string,
    roles: Array<string>
}

class UserCreate implements IUserCreate {
    _id?: string
    _rev?: string
    name: string
    email: string
    dob: Date
    password: string
    roles: Array<string>
    
    constructor(name: string, email: string, dob: Date, password: string, roles: Array<string>) {
        this._id = undefined;
        this._rev = undefined;
        this.name = name;
        this.dob = dob;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
  
    processAPIResponse(response: nano.DocumentInsertResponse) {
        if (response.ok === true) {
            this._id = response.id
            this._rev = response.rev
        }
    }
}

export default UserCreate;
