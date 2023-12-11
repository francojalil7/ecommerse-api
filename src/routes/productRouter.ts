import { Router, Request, Response } from "express";
import { ProductManager } from "../model";
const productManager = new ProductManager("./src/db/products.json");

const productRouter = Router();

productRouter.get("/", async (_req: Request, res: Response) => {
  const limit = _req.query.limit as string | undefined;
  const products = await productManager.getProducts();
  if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit, 10));
    res.send({ message: "succes", data: limitedProducts, limit: limit });
  } else {
    res.send({ message: "succes", data: products });
  }
});

productRouter.get("/:pid", async (_req: Request, res: Response) => {
  const id = _req.params.pid;
  const product = await productManager.getProductById(parseInt(id));
  res.send({ message: "succes", data: product });
});

productRouter.post("/", (_req: Request, res: Response) => {
  try {
    const product = _req.body;
    productManager.addProduct(product);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(400).json({ error: "Could not add product" });
  }
});

productRouter.delete("/:pid", async (_req: Request, res: Response) => {
  const id = _req.params.pid;
  try {
    await productManager.deleteProduct(parseInt(id));
    res.status(204).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "It was not possible to delete the product" });
  }
});

export default productRouter;
