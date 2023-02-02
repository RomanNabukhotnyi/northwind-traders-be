import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { OrderService } from "../services/OrderService";

export class OrderController extends Controller {
    constructor(private orderService: OrderService) {
        super('/orders');
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAll);
    }

    private getAll = async (request: Request, response: Response) => {
        const orders = await this.orderService.getAll();
        return response.status(200).json(okResponse(orders));
    }
}