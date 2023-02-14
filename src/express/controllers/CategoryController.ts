import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { CategoryService } from "../services/CategoryService";

export class CategoryController extends Controller {
    constructor(private categoryService: CategoryService) {
        super('/categories');
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAll);
    }

    private getAll = async (request: Request, response: Response) => {
        const categories = await this.categoryService.getAll();
        return response.status(200).json(okResponse(categories));
    }
}