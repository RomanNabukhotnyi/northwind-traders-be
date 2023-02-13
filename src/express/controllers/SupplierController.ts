import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { SupplierService } from "../services/SupplierService";
import { apiCreateSupplierSchema } from "../dtos/suppliers/requests/ApiCreateSupplier";
import { idSchema } from "../dtos/common/idSchema";

export class SupplierController extends Controller {
    constructor(private supplierService: SupplierService) {
        super('/suppliers');
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAll);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.delete);
    }

    private getAll = async (request: Request, response: Response) => {
        const suppliers = await this.supplierService.getAll();
        return response.status(200).json(okResponse(suppliers));
    }

    private create = async (request: Request, response: Response) => {
        const { body: reqBody } = request;
        const body = await apiCreateSupplierSchema.parseAsync(reqBody);
        const supplier = await this.supplierService.create(body);
        return response.status(200).json(okResponse(supplier));
    }

    private delete = async (request: Request, response: Response) => {
        const { params } = request;
        const supplierId = await idSchema.parseAsync(params.id);
        await this.supplierService.delete(supplierId);
        return response.status(200).json(okResponse({
            id: supplierId,
        }));
    }

}