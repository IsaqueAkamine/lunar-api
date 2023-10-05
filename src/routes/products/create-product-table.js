import { sql } from "../db.js";

// sql`DROP TABLE IF EXISTS products;`.then(() => {
//   console.log("Tabela products apagada");
// });

sql`
  CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    manufacturer VARCHAR(100),
    category VARCHAR(100),
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`.then(() => {
  console.log("Tabela products criada");
});

// const product = {
//   id,
//   name,
//   description,
//   price,
//   stock_quantity,
//   manufacturer,
//   category,
//   is_available,
//   // created_at,
//   // updated_at,
// };
