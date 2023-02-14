import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { CustomerService } from "../services/CustomerService";
import { apiCreateCustomerSchema } from "../dtos/customers/ApiCreateCustomer";

export class CustomerController extends Controller {
    constructor(private customerService: CustomerService) {
        super('/customers');
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.create);
        this.router.get('/', this.getAll);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }

    private create = async (request: Request, response: Response) => {
        const { body: reqBody } = request;
        const body = await apiCreateCustomerSchema.parseAsync(reqBody);
        const customer = await this.customerService.create(body);
        return response.status(200).json(okResponse(customer));
    }

    private getAll = async (request: Request, response: Response) => {
        const customers = await this.customerService.getAll();
        return response.status(200).json(okResponse(customers));
    }

    private update = async (request: Request, response: Response) => {
        const { params, body: reqBody } = request;
        const body = await apiCreateCustomerSchema.parseAsync(reqBody);
        const customer = await this.customerService.update(params.id, body);
        return response.status(200).json(okResponse(customer));
    }

    private delete = async (request: Request, response: Response) => {
        const { params } = request;
        await this.customerService.delete(params.id);
        return response.status(200).json(okResponse({
            id: params.id,
        }));
    }
}