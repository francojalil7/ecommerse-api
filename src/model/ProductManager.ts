import { Product } from "../interface/interfaces";
import { readData, writeData } from "../utils/files";

class ProductManager {
  products: Array<Product>;
  path: string;
  static correlativoId = 0;

  constructor(path: string) {
    this.path = path;
    this.products = [];
  }

  addProduct(product: Product) {
    const { title, description, price, thumbnail, code, stock } = product;

    if (
      title === undefined ||
      description === undefined ||
      price === undefined ||
      thumbnail === undefined ||
      code === undefined ||
      stock === undefined
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    let codeExists = this.products.some((dato) => dato.code === code);

    if (codeExists) {
      throw new Error("El código ya existe, por favor verifique");
    } else {
      ProductManager.correlativoId++;
      const newProduct = {
        id: ProductManager.correlativoId,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(newProduct);
      writeData(this.path, this.products);
    }
  }

  async getProducts() {
    const products = await readData(this.path);
    return products;
  }

  async getProductById(id: number) {
    let products = await readData(this.path);
    const product = products.find((product: Product) => product.id === id);
    if (product !== undefined) {
      return product;
    } else {
      return "No existe el producto solicitado";
    }
  }
  updateProduct(id: number, updatedFields: Partial<Product>) {
    this.products = this.products.map((product) => {
      if (product.id === id) {
        return { ...product, ...updatedFields };
      }

      return product;
    });
  }
  async deleteProduct(id: number) {
    let products = await readData(this.path);
    const newProducts = products.filter((product: Product) => product.id != id);
    writeData(this.path, newProducts);
  }
}

export default ProductManager;
