import express, { Request, Response } from "express";
import { productRouter,cartRouter } from "./routes";
const app = express();
app.use(express.json());

const PORT = 8080;

app.use(express.json());


app.get("/api", (_req: Request, res: Response) => {
  res.send("Welcome!");
});
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
