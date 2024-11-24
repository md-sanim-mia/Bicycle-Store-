# Bicycle Store API

This project is a **TypeScript-based Express.js application** designed to manage a **Bicycle Store**, with seamless integration of **MongoDB** using **Mongoose**. The API provides endpoints for managing products (bicycles) and orders, ensuring data integrity and offering features like inventory management and revenue calculation.

---

## Features

1. **Product Management (CRUD):**
   - Add, update, retrieve, and delete bicycles.
   - Supports search and filtering by name, brand, and type.

2. **Order Management:**
   - Place orders, update inventory automatically.
   - Handle cases with insufficient stock.

3. **Revenue Calculation:**
   - Aggregates order data to calculate total revenue.

4. **Data Validation:**
   - Enforced via **Mongoose schemas**.
   - Returns structured error responses with stack traces for debugging.

---

## API Endpoints

### Products
1. **Create a Bicycle**
   - **POST** `/api/products`

2. **Get All Bicycles**
   - **GET** `/api/products`
   - Supports search with `searchTerm`.

3. **Get a Specific Bicycle**
   - **GET** `/api/products/:productId`

4. **Update a Bicycle**
   - **PUT** `/api/products/:productId`

5. **Delete a Bicycle**
   - **DELETE** `/api/products/:productId`

---

### Orders
1. **Place an Order**
   - **POST** `/api/orders`
   - Updates inventory automatically.

2. **Calculate Revenue**
   - **GET** `/api/orders/revenue`
   - Aggregates total revenue from all orders.

