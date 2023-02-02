import {
  mysqlTable,
  varchar,
  text,
  binary,
  char,
  decimal,
  boolean,
  datetime,
  real,
  int,
  InferModel,
} from 'drizzle-orm/mysql-core';

export const categories = mysqlTable('categories', {
  id: int('id').autoincrement().primaryKey().notNull(),
  name: varchar('name', { length: 15 }).notNull(),
  description: text('description'),
  picture: binary('picture'),
});

export const suppliers = mysqlTable('suppliers', {
  id: int('id').autoincrement().primaryKey().notNull(),
  companyName: varchar('company_name', { length: 40 }).notNull(),
  contactName: varchar('contact_name', { length: 30 }),
  contactTitle: varchar('contact_title', { length: 30 }),
  address: varchar('address', { length: 60 }),
  city: varchar('city', { length: 15 }),
  region: varchar('region', { length: 15 }),
  postalCode: varchar('postal_code', { length: 10 }),
  country: varchar('country', { length: 15 }),
  phone: varchar('phone', { length: 24 }),
  fax: varchar('fax', { length: 24 }),
  homePage: text('home_page'),
});

export const regions = mysqlTable('regions', {
  id: int('id').autoincrement().primaryKey().notNull(),
  description: char('description', { length: 50 }).notNull(),
});

export const territories = mysqlTable('territories', {
  id: varchar('id', { length: 20 }).primaryKey().notNull(),
  description: char('description', { length: 50 }).notNull(),
  regionId: int('region_id')
    .references(() => regions.id, {
      onDelete: 'cascade',
    })
    .notNull(),
});

export const products = mysqlTable('products', {
  id: int('id').autoincrement().primaryKey().notNull(),
  name: varchar('name', { length: 40 }).notNull(),
  supplierId: int('supplier_id').references(() => suppliers.id, {
    onDelete: 'cascade',
  }),
  categoryId: int('category_id').references(() => categories.id, {
    onDelete: 'cascade',
  }),
  quantityPerUnit: varchar('quantity_per_unit', { length: 20 }),
  unitPrice: decimal('unit_price', { precision: 10, scale: 4 }),
  unitsInStock: int('units_in_stock'),
  unitsOnOrder: int('units_on_order'),
  reorderLevel: int('reorder_level'),
  discontinued: boolean('discontinued').notNull(),
});

export const shippers = mysqlTable('shippers', {
  id: int('id').autoincrement().primaryKey().notNull(),
  name: varchar('name', { length: 40 }).notNull(),
  phone: varchar('phone', { length: 24 }),
});

export const customers = mysqlTable('customers', {
  id: char('id', { length: 5 }).primaryKey().notNull(),
  companyName: varchar('company_name', { length: 40 }).notNull(),
  contactName: varchar('contact_name', { length: 30 }),
  contactTitle: varchar('contact_title', { length: 30 }),
  address: varchar('address', { length: 60 }),
  city: varchar('city', { length: 15 }),
  region: varchar('region', { length: 15 }),
  postalCode: varchar('postal_code', { length: 10 }),
  country: varchar('country', { length: 15 }),
  phone: varchar('phone', { length: 24 }),
  fax: varchar('fax', { length: 24 }),
});

export const employees: any = mysqlTable('employees', {
  id: int('id').autoincrement().primaryKey().notNull(),
  lastName: varchar('last_name', { length: 20 }).notNull(),
  firstName: varchar('first_name', { length: 10 }).notNull(),
  title: varchar('title', { length: 30 }),
  titleOfCourtesy: varchar('title_of_courtesy', { length: 25 }),
  birthDate: datetime('birth_date'),
  hireDate: datetime('hire_date'),
  address: varchar('address', { length: 60 }),
  city: varchar('city', { length: 15 }),
  region: varchar('region', { length: 15 }),
  postalCode: varchar('postal_code', { length: 10 }),
  country: varchar('country', { length: 15 }),
  homePhone: varchar('home_phone', { length: 24 }),
  extension: varchar('extension', { length: 4 }),
  photo: binary('photo'),
  notes: text('notes'),
  reportsTo: int('reports_to').references(() => employees.id, {
    onDelete: 'cascade',
  }),
  photoPath: varchar('photo_path', { length: 255 }),
});

export const employeeTerritories = mysqlTable('employee_territories', {
  employeeId: int('employee_id')
    .references(() => employees.id, {
      onDelete: 'cascade',
    })
    .primaryKey()
    .notNull(),
  territoryId: varchar('territory_id', { length: 20 })
    .references(() => territories.id, {
      onDelete: 'cascade',
    })
    .primaryKey()
    .notNull(),
});

export const orders = mysqlTable('orders', {
  id: int('id').autoincrement().primaryKey().notNull(),
  customerId: char('customer_id').references(() => customers.id, {
    onDelete: 'cascade',
  }),
  employeeId: int('employee_id').references(() => employees.id, {
    onDelete: 'cascade',
  }),
  orderDate: datetime('order_date'),
  requiredDate: datetime('required_date'),
  shippedDate: datetime('shipped_date'),
  shipVia: int('ship_via').references(() => shippers.id, {
    onDelete: 'cascade',
  }),
  freight: decimal('freight', { precision: 10, scale: 4 }),
  shipName: varchar('ship_name', { length: 40 }),
  shipAddress: varchar('ship_address', { length: 60 }),
  shipCity: varchar('ship_city', { length: 15 }),
  shipRegion: varchar('ship_region', { length: 15 }),
  shipPostalCode: varchar('ship_postal_code', { length: 10 }),
  shipCountry: varchar('ship_country', { length: 15 }),
});

export const orderDetails = mysqlTable('order_details', {
  orderId: int('order_id')
    .references(() => orders.id, {
      onDelete: 'cascade',
    })
    .primaryKey()
    .notNull(),
  productId: int('product_id')
    .references(() => products.id, {
      onDelete: 'cascade',
    })
    .primaryKey()
    .notNull(),
  unitPrice: decimal('unit_price', { precision: 10, scale: 4 }).notNull(),
  quantity: int('quantity').notNull(),
  discount: real('discount').notNull(),
});

export type Supplier = InferModel<typeof suppliers>;
export type Product = InferModel<typeof products>;
export type Order = InferModel<typeof orders>;
export type Employee = InferModel<typeof employees>;
export type Customer = InferModel<typeof customers>;
