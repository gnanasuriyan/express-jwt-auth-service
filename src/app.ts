import {container, inject, singleton} from "tsyringe";
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import createHttpError from 'http-errors';

import  AppLogger from "./utils/logger";
import UserRouter from "./routes/user.router";
import PassportLocalStrategy from "./middleware/passport.local.strategy";
import PassportJWTStategy from "./middleware/passport.jwt.strategy";

const passport = require('passport');

@singleton()
class App {
    private app: express.Application;
    constructor(
        @inject(AppLogger) private appLogger: AppLogger,
        @inject(UserRouter) private userRouter: UserRouter,
        @inject(PassportLocalStrategy) private localStrategy: PassportLocalStrategy,
        @inject(PassportJWTStategy) private jwtStrategy: PassportJWTStategy
    ) {
        this.app = express();
        this.config();
    }

    // express app configuration
    private config() {
        // cors configuration
        this.app.use(cors());
        // body parser configuration
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        
        // application router configuration
        this.app.get('/', (req, res) => {
            res.send({ping: 'pong'});
        });

        this.app.get('/health', (req, res) => {
            res.send({status: true});
        });

        this.localStrategy.setup(passport)
        this.jwtStrategy.setup(passport)
        passport.use(passport.initialize());

        this.app.use('/v1/users', this.userRouter.init());

        // catch 404 and forward to error handler
        this.app.use((req, res, next) => {
            next(createHttpError(404));
        });

        // error handler
        this.app.use((err: any, req: any, res: any, next: () => void) => {
            res.locals.message = err.message;
            res.locals.error = err;
            res.status(err.status || 500);
            res.send({status: false, error: err.message || 'internal server error'});
        });
    }

    public start() {
        const PORT = process.env.PORT || 4001;
        this.app.listen(PORT, () => {
            this.appLogger.instance.info(`BOOT: service is running and listening on port ${PORT}`);
        })
    }
}

container.registerSingleton<App>(App);

export default App;
