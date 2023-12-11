import { Cart, ProductCart } from "../interface/interfaces";
import { readData, writeData } from "../utils/files";

class CartManager {
  carts: Array<Cart>;
  path: string;
  static correlativoId = 0;

  constructor(path: string) {
    this.carts = [];
    this.path = path;
  }

  addCart() {
    CartManager.correlativoId++;
    const newCart = { id: CartManager.correlativoId, products: [] };
    this.carts.push(newCart);
    writeData(this.path, this.carts);
  }

  async getCartById(id: number) {
    let carts = await readData(this.path);

    const cart = carts.find((cart: Cart) => cart.id === id);

    if (cart !== undefined) {
      return cart;
    } else {
      return [];
    }
  }

  async addProductToCart(cartId: number, productId: number) {
    const carts = await readData(this.path);
    console.log("carrito encontrado", carts);

    const cartIndex = carts.findIndex(
      (cart: ProductCart) => cart.id === cartId
    );

    if (cartIndex !== -1) {
      const productIndex = carts[cartIndex].products.findIndex(
        (product: ProductCart) => product.id === productId
      );

      if (productIndex !== -1) {
        // Si el producto ya existe, incrementa la cantidad
        carts[cartIndex].products[productIndex].quantity++;
      } else {
        // Si el producto no existe, agrégalo al carrito
        carts[cartIndex].products.push({ id: productId, quantity: 1 });
      }

      // Guardamos los carritos actualizados
      await writeData(this.path, carts);
    }

    return carts;
  }
}

export default CartManager;
