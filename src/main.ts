import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';

import { App } from './express/App';

import { SupplierRepository } from './db/repositories/SupplierRepository';
import { ProductRepository } from './db/repositories/ProductRepository';
import { OrderRepository } from './db/repositories/OrderRepository';
import { OrderDetailsRepository } from './db/repositories/OrderDetailsRepository';
import { EmployeeRepository } from './db/repositories/EmployeeRepository';
import { CustomerRepository } from './db/repositories/CustomerRepository';

import { SupplierService } from './express/services/SupplierService';
import { ProductService } from './express/services/ProductService';
import { OrderService } from './express/services/OrderService';
import { EmployeeService } from './express/services/EmployeeService';
import { CustomerService } from './express/services/CustomerService';

import { SupplierController } from './express/controllers/SupplierController';
import { ProductController } from './express/controllers/ProductController';
import { OrderController } from './express/controllers/OrderController';
import { EmployeeController } from './express/controllers/EmployeeController';
import { CustomerController } from './express/controllers/CustomerController';

async function main() {
  try {
    const poolConnection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'northwind_traders',
      multipleStatements: true,
    });
  
    const db = drizzle(poolConnection);
  
    await migrate(db, { migrationsFolder: './drizzle' });

    const supplierRepository = new SupplierRepository(db);
    const productRepository = new ProductRepository(db);
    const orderRepository = new OrderRepository(db);
    const orderDetailsRepository = new OrderDetailsRepository(db);
    const employeeRepository = new EmployeeRepository(db);
    const customerRepository = new CustomerRepository(db);

    const supplierService = new SupplierService(supplierRepository);
    const productService = new ProductService(productRepository);
    const orderService = new OrderService(orderRepository, orderDetailsRepository, productRepository);
    const employeeService = new EmployeeService(employeeRepository);
    const customerService = new CustomerService(customerRepository);

    const supplierController = new SupplierController(supplierService);
    const productController = new ProductController(productService);
    const orderController = new OrderController(orderService);
    const employeeController = new EmployeeController(employeeService);
    const customerController = new CustomerController(customerService);

    const port = process.env.PORT || 4000;

    const expressApp = new App(port, [
      supplierController,
      productController,
      orderController,
      employeeController,
      customerController,
    ]);

    expressApp.listen();
  } catch (error) {
    console.log(error);
  }
}

main();
