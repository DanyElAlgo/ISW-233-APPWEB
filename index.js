import Router from "./services/Router.js";

import Store from "./services/store.js";
import { loadData } from "./services/Menu.js";

import { MenuPage } from "./blocks/menuPage/menuPage.js";
import ProductItem from "./blocks/productItem/productItem.js";

import initMockDB from "./data/db.js";


globalThis.app = {};

app.store = Store;
app.router = Router;

const db = initMockDB({
  title: "Product Title",
  name: "Product Name",
  price: 123,
  description: "Product Description"
});

// Guardar la referencia de db en el store
app.store.db = db;

window.addEventListener("DOMContentLoaded", async () => {
  loadData();
  app.router.init();
});

window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});



// to get the next data
const data = await db.next();