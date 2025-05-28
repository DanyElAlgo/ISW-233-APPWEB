import { getProductById } from "./Menu.js";

export async function addToCart(id, qtty) {
  const product = await getProductById(id);
  const results = app.store.cart.filter((productInCart) => productInCart.product.id == id);
  if (results.length == 1) {
    app.store.cart = app.store.cart.map((p) =>
      p.product.id == id ? { ...p, quantity: p.quantity + qtty } : p
    );
  } else {
    // app.store.cart.push(results);
    app.store.cart = [...app.store.cart, { product, quantity: qtty }];
  }
}

export async function removeFromCart(id) {
  const results = app.store.cart.filter((productInCart) => productInCart.product.id == id);
  if (results.length == 1) {
    const product = results[0];
    if (product.quantity > 1) {
      app.store.cart = app.store.cart.map((p) =>
        p.product.id == id ? { ...p, quantity: p.quantity - 1 } : p
      );
    } else {
      app.store.cart = app.store.cart.filter((p) => p.product.id != id);
    }
  }
}

export async function cleanCart(){
  app.store.cart = [];
  window.dispatchEvent(new CustomEvent("appcartchange"));
}