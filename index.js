import Router from "./services/Router.js";

import Store from "./services/store.js";
import { loadData, loadRestaurants } from "./services/Menu.js";

import { MenuPage } from "./blocks/menuPage/menuPage.js";
import ProductItem from "./blocks/productItem/productItem.js";

import RestaurantItem from "./blocks/restaurantItem/restaurantItem.js";
import { RestaurantPage } from "./blocks/restaurantPage/restaurantPage.js";

import { OrderPage } from "./blocks/orderPage/orderPage.js";
import OrderItem from "./blocks/orderItem/orderItem.js";

import ProductPage from "./blocks/productPage/productPage.js";

globalThis.app = {};

app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {
  app.router.init();
});

window.addEventListener("loadProducts", () => {
  loadData();
});

window.addEventListener("loadRestaurants", () => {
  loadRestaurants();
});

window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});
