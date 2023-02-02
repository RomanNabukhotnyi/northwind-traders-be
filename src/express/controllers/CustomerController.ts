import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { CustomerService } from "../services/CustomerService";

export class CustomerController extends Controller {
    constructor(private customerService: CustomerService) {
        super('/customers');
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAll);
    }

    private getAll = async (request: Request, response: Response) => {
        const customers = await this.customerService.getAll();
        return response.status(200).json(okResponse(customers));
    }
}