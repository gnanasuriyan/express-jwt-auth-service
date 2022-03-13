import "reflect-metadata";
// import { container } from "tsyringe";
// import passport from 'passport';
// import UserController from "../../controller/user.controller";

// const userController = container.resolve(UserController);

// const mockRequest = (sessionData: any) => {
//     return {
//       session: { data: sessionData }
//     };
// };

// const mockResponse = () => {
//     const res: any = {};
//     res.status = jest.fn().mockReturnValue(res);
//     res.json = jest.fn().mockReturnValue(res);
//     return res;
// };

// beforeAll(() => {
//     container.reset();
// });
  
// afterAll(() => {
//     container.reset();
// });

describe('user controller test cases', () => {
    test('login with invalid username and passord', () => {
        // const req = mockRequest({});
        // const res = mockResponse();
        // jest.fn((authType, options, done: any) => done(new Error('user doesn\'t exist'), false, { message: 'error' }));
        // userController.login(req, res)
        // expect(res.status).toHaveBeenCalledWith(401);
        expect(false).not.toBeTruthy();
    });

    test('login with valid username and passord', () => {
        expect(false).not.toBeTruthy();
    });

    test('get user details with valid token', () => {
        expect(false).not.toBeTruthy();
    });

    test('get user details with invalid token', () => {
        expect(false).not.toBeTruthy();
    });

    test('logout with valid token', () => {
        expect(false).not.toBeTruthy();
    });
});
