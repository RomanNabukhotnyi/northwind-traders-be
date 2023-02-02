import { Router } from 'express';

export abstract class Controller {
    public path: string;
    public router: Router;

    constructor(path: string) {
        this.path = path;
        this.router = Router();
    }
}