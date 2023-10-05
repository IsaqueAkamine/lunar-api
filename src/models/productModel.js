// models/productModel.js
import { randomUUID } from "node:crypto";
import { sql } from "../../db.js";

class ProductModel {
  async list(search) {
    let products;

    if (search) {
      products = await sql`SELECT * FROM products WHERE name ilike ${
        "%" + search + "%"
      }`;
    } else {
      products = await sql`SELECT * FROM products `;
    }

    return products;
  }

  async get(id) {
    const product = await sql`SELECT * FROM products WHERE id = ${id}`;
    return product;
  }

  async create(product) {
    const productId = randomUUID();
    const {
      name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_available,
      created_at,
      updated_at,
    } = product;

    await sql`INSERT INTO products (
      id,
      name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_available,
      created_at,
      updated_at
    ) VALUES (
      ${productId}, 
      ${name}, 
      ${description}, 
      ${price}, 
      ${stock_quantity}, 
      ${manufacturer}, 
      ${category},
      ${is_available},
      ${created_at},
      ${updated_at}
    )`;
  }

  async update(id, product) {
    const {
      name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_available,
    } = product;

    await sql`UPDATE products SET 
      name = ${name}, 
      description = ${description}, 
      price = ${price}, 
      stock_quantity = ${stock_quantity}, 
      manufacturer = ${manufacturer}, 
      category = ${category}, 
      is_available = ${is_available}
    WHERE id = ${id};`;
  }

  async delete(id) {
    await sql`DELETE FROM products WHERE id = ${id}`;
  }
}

export default ProductModel;
