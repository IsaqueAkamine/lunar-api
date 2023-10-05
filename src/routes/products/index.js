import ProductModel from "../../models/productModel.js";

const database = new ProductModel();

// routes/products.js
const productRoutes = async (fastify, options) => {
  // Add other routes related to products here

  fastify.post("/products", async (request, reply) => {
    console.log("POST PRODUCT");
    const {
      name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_available,
    } = request.body;

    const currentDate = Date.now();

    await database.create({
      name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_available,
      created_at: currentDate,
      updated_at: currentDate,
    });

    return reply.status(201).send();
  });

  fastify.get("/products", async (request) => {
    console.log("GET PRODUCT");
    const search = request.query.search;
    const products = database.list(search);

    return products;
  });

  fastify.get("/products/:id", async (request) => {
    const productId = request.params.id;
    const product = database.get(productId);

    return product;
  });

  fastify.put("/products/:id", async (request, reply) => {
    const productId = request.params.id;
    const {
      name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_available,
    } = request.body;

    await database.update(productId, {
      name,
      description,
      price,
      stock_quantity,
      manufacturer,
      category,
      is_available,
    });

    return reply.status(204).send();
  });

  fastify.delete("/products/:id", async (request, reply) => {
    const productId = request.params.id;

    await database.delete(productId);

    return reply.status(204).send();
  });

  return fastify;
};

export default productRoutes;
