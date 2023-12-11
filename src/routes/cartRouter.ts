import { Router, Request, Response } from "express";
import { CartManager } from "../model";
const cartManager = new CartManager("./src/db/carts.json");

const cartRouter = Router();

cartRouter.get("/:cid", async (_req: Request, res: Response) => {
  const id = _req.params.cid;
  const cart = await cartManager.getCartById(parseInt(id));
  res.send({ message: "succes", data: cart.products });
});
cartRouter.get("/:cid/product/:pid", async (_req: Request, res: Response) => {
    const { cid, pid } = _req.params;
    const productId = parseInt(pid);
    const cartId = parseInt(cid);
      console.log("productId,",productId)
      console.log("cartId,",cartId)
    try {
      cartManager.addProductToCart(cartId,productId);
      res.status(201).json({ message: "Product added successfully to Cart" });
    } catch (error) {
      console.log("error ", error);
      res.status(400).json({ error });
    }
  });
cartRouter.post("/", async (_req: Request, res: Response) => {
  try {
    cartManager.addCart();
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.log("error ", error);
    res.status(400).json({ error });
  }
});



export default cartRouter;
