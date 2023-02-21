import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { ProductService } from "../services/ProductService";
import { apiCreateProductSchema } from "../dtos/products/ApiCreateProduct";
import { idSchema } from "../dtos/common/idSchema";

export class ProductController extends Controller {
    constructor(private productService: ProductService) {
        super('/products');
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.create);
        this.router.get('/', this.getAll);
        this.router.put('/:id', this.update);
        this.router.delete('/:id', this.delete);
        this.router.get('/statistic', this.getTotalProductsSold);
    }

    private create = async (request: Request, response: Response) => {
        const { body: reqBody } = request;
        const body = await apiCreateProductSchema.parseAsync(reqBody);
        const product = await this.productService.create(body);
        return response.status(200).json(okResponse(product));
    }

    private getAll = async (request: Request, response: Response) => {
        const products = await this.productService.getAll();
        return response.status(200).json(okResponse(products));
    }

    private getTotalProductsSold = async (request: Request, response: Response) => {
        const totalProductsSold = await this.productService.getTotalProductsSold();
        return response.status(200).json(okResponse(totalProductsSold));
    }

    private update = async (request: Request, response: Response) => {
        const { params, body: reqBody } = request;
        const body = await apiCreateProductSchema.parseAsync(reqBody);
        const productId = await idSchema.parseAsync(params.id);
        const product = await this.productService.update(productId, body);
        return response.status(200).json(okResponse(product));
    }

    private delete = async (request: Request, response: Response) => {
        const { params } = request;
        const productId = await idSchema.parseAsync(params.id);
        await this.productService.delete(productId);
        return response.status(200).json(okResponse({
            id: productId,
        }));
    }
}