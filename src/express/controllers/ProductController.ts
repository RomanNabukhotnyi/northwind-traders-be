import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { ProductService } from "../services/ProductService";

export class ProductController extends Controller {
    constructor(private productService: ProductService) {
        super('/products');
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAll);
    }

    private getAll = async (request: Request, response: Response) => {
        const products = await this.productService.getAll();
        return response.status(200).json(okResponse(products));
    }
}