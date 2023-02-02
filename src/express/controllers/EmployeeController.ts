import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { EmployeeService } from "../services/EmployeeService";

export class EmployeeController extends Controller {
    constructor(private employeeService: EmployeeService) {
        super('/employees');
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.getAll);
    }

    private getAll = async (request: Request, response: Response) => {
        const employees = await this.employeeService.getAll();
        return response.status(200).json(okResponse(employees));
    }
}