import {container, singleton} from "tsyringe";
import { createLogger, format, Logger, transports } from 'winston';
import { SupportedEnv } from '../environment';

const loggerTransports = process.env.NODE_ENV === SupportedEnv.PROD ? [
    new transports.File({
        filename: `logs/${process.env.SERVICE_NAME}-error.log`,
        level: 'error',
    }),
    new transports.File({
        filename: `logs/${process.env.SERVICE_NAME}-combined.log`,
    }),
    new transports.Console(), 
]: [
    new transports.File({
        filename: `logs/${process.env.SERVICE_NAME}-error.log`,
        level: 'error',
    }),
    new transports.File({
        filename: `logs/${process.env.SERVICE_NAME}-combined.log`,
    }),
    new transports.Console(),
    new transports.Console({
        format: format.combine(
            format.colorize({ all: false }),
            format.printf(({ level, service, message, timestamp }) =>`${timestamp} [${service}] ${level}: ${message}`),
        ),
    }),
];


@singleton()
class AppLogger {
    public instance: Logger
    constructor() {
        this.instance = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.errors({ stack: true }),
                format.splat(),
                format.json(),
            ),
            defaultMeta: { service: process.env.SERVICE_NAME },
            transports: loggerTransports,
        });
    }
}

container.registerSingleton<AppLogger>(AppLogger);

export default AppLogger;
