import { Request, Response } from "express";
import { Controller } from "./Controller";
import { okResponse } from "../api/BaseResponses";
import { EmployeeService } from "../services/EmployeeService";
import { apiCreateEmployeeSchema } from "../dtos/employees/ApiCreateEmployee";
import { idSchema } from "../dtos/common/idSchema";

export class EmployeeController extends Controller {
    constructor(private employeeService: EmployeeService) {
        super('/employees');
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
        const body = await apiCreateEmployeeSchema.parseAsync(reqBody);
        const employee = await this.employeeService.create(body);
        return response.status(200).json(okResponse(employee));
    }

    private getAll = async (request: Request, response: Response) => {
        const employees = await this.employeeService.getAll();
        return response.status(200).json(okResponse(employees));
    }

    private update = async (request: Request, response: Response) => {
        const { params, body: reqBody } = request;
        const employeeId = await idSchema.parseAsync(params.id);
        const body = await apiCreateEmployeeSchema.parseAsync(reqBody);
        const employee = await this.employeeService.update(employeeId, body);
        return response.status(200).json(okResponse(employee));
    }

    private delete = async (request: Request, response: Response) => {
        const { params } = request;
        const employeeId = await idSchema.parseAsync(params.id);
        await this.employeeService.delete(employeeId);
        return response.status(200).json(okResponse({
            id: employeeId,
        }));
    }
}