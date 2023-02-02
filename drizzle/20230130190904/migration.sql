CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(15) NOT NULL,
	`description` text,
	`picture` binary
);

CREATE TABLE `customers` (
	`id` char(5) PRIMARY KEY NOT NULL,
	`company_name` varchar(40) NOT NULL,
	`contact_name` varchar(30),
	`contact_title` varchar(30),
	`address` varchar(60),
	`city` varchar(15),
	`region` varchar(15),
	`postal_code` varchar(10),
	`country` varchar(15),
	`phone` varchar(24),
	`fax` varchar(24)
);

CREATE TABLE `employee_territories` (
	`employee_id` int NOT NULL,
	`territory_id` varchar(20) NOT NULL,
	PRIMARY KEY (`employee_id`, `territory_id`)
);

CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`last_name` varchar(20) NOT NULL,
	`first_name` varchar(10) NOT NULL,
	`title` varchar(30),
	`title_of_courtesy` varchar(25),
	`birth_date` datetime,
	`hire_date` datetime,
	`address` varchar(60),
	`city` varchar(15),
	`region` varchar(15),
	`postal_code` varchar(10),
	`country` varchar(15),
	`home_phone` varchar(24),
	`extension` varchar(4),
	`photo` binary,
	`notes` text,
	`reports_to` int,
	`photo_path` varchar(255)
);

CREATE TABLE `order_details` (
	`order_id` int NOT NULL,
	`product_id` int NOT NULL,
	`unit_price` decimal(10, 4) NOT NULL,
	`quantity` int NOT NULL,
	`discount` real NOT NULL,
	PRIMARY KEY (`order_id`, `product_id`)
);

CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`customer_id` char(5),
	`employee_id` int,
	`order_date` datetime,
	`required_date` datetime,
	`shipped_date` datetime,
	`ship_via` int,
	`freight` decimal(10, 4),
	`ship_name` varchar(40),
	`ship_address` varchar(60),
	`ship_city` varchar(15),
	`ship_region` varchar(15),
	`ship_postal_code` varchar(10),
	`ship_country` varchar(15)
);

CREATE TABLE `products` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(40) NOT NULL,
	`supplier_id` int,
	`category_id` int,
	`quantity_per_unit` varchar(20),
	`unit_price` decimal(10, 4),
	`units_in_stock` int,
	`units_on_order` int,
	`reorder_level` int,
	`discontinued` boolean NOT NULL
);

CREATE TABLE `regions` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`description` char(50) NOT NULL
);

CREATE TABLE `shippers` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(40) NOT NULL,
	`phone` varchar(24)
);

CREATE TABLE `suppliers` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`company_name` varchar(40) NOT NULL,
	`contact_name` varchar(30),
	`contact_title` varchar(30),
	`address` varchar(60),
	`city` varchar(15),
	`region` varchar(15),
	`postal_code` varchar(10),
	`country` varchar(15),
	`phone` varchar(24),
	`fax` varchar(24),
	`home_page` text
);

CREATE TABLE `territories` (
	`id` varchar(20) PRIMARY KEY NOT NULL,
	`description` char(50) NOT NULL,
	`region_id` int NOT NULL
);

ALTER TABLE employee_territories ADD CONSTRAINT employee_territories_employee_id_employees_id_fk FOREIGN KEY (`employee_id`) REFERENCES employees(`id`) ON DELETE cascade ;
ALTER TABLE employee_territories ADD CONSTRAINT employee_territories_territory_id_territories_id_fk FOREIGN KEY (`territory_id`) REFERENCES territories(`id`) ON DELETE cascade ;
ALTER TABLE employees ADD CONSTRAINT employees_reports_to_employees_id_fk FOREIGN KEY (`reports_to`) REFERENCES employees(`id`) ON DELETE cascade ;
ALTER TABLE order_details ADD CONSTRAINT order_details_order_id_orders_id_fk FOREIGN KEY (`order_id`) REFERENCES orders(`id`) ON DELETE cascade ;
ALTER TABLE order_details ADD CONSTRAINT order_details_product_id_products_id_fk FOREIGN KEY (`product_id`) REFERENCES products(`id`) ON DELETE cascade ;
ALTER TABLE orders ADD CONSTRAINT orders_customer_id_customers_id_fk FOREIGN KEY (`customer_id`) REFERENCES customers(`id`) ON DELETE cascade ;
ALTER TABLE orders ADD CONSTRAINT orders_employee_id_employees_id_fk FOREIGN KEY (`employee_id`) REFERENCES employees(`id`) ON DELETE cascade ;
ALTER TABLE orders ADD CONSTRAINT orders_ship_via_shippers_id_fk FOREIGN KEY (`ship_via`) REFERENCES shippers(`id`) ON DELETE cascade ;
ALTER TABLE products ADD CONSTRAINT products_supplier_id_suppliers_id_fk FOREIGN KEY (`supplier_id`) REFERENCES suppliers(`id`) ON DELETE cascade ;
ALTER TABLE products ADD CONSTRAINT products_category_id_categories_id_fk FOREIGN KEY (`category_id`) REFERENCES categories(`id`) ON DELETE cascade ;
ALTER TABLE territories ADD CONSTRAINT territories_region_id_regions_id_fk FOREIGN KEY (`region_id`) REFERENCES regions(`id`) ON DELETE cascade ;