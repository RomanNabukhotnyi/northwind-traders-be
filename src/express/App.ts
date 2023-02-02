import cors from 'cors';
import express, { Application } from 'express';
import { Controller } from './controllers/Controller';

export class App {
    app: Application;
    private port: string | number;
    private controllers: Controller[];

    constructor(port: string | number, controllers: Controller[]) {
        this.app = express();
        this.port = port;
        this.controllers = controllers;

        this.initializeMiddlewares();
        this.initializeControllers();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }

    public initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    public initializeControllers() {
        this.controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }
}