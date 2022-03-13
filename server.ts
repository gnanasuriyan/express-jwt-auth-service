import dotenv from 'dotenv'
dotenv.config();
import "reflect-metadata";
import {container} from "tsyringe";
import App from './src/app';

const app = container.resolve(App);
app.start();
