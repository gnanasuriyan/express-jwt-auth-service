import { Router } from "express";

export interface IAppRouter {
    init: () => Router;
}