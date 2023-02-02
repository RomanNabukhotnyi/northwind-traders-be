import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { SupplierService } from "../services/SupplierService";

export class SupplierController extends Controller {
    constructor(private supplierService: SupplierService) {
        super('/suppliers');
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAll);
    }

    private getAll = async (request: Request, response: Response) => {
        const suppliers = await this.supplierService.getAll();
        return response.status(200).json(okResponse(suppliers));
    }
}