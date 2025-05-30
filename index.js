import Router from "./services/Router.js";

import Store from "./services/store.js";
import { loadData } from "./services/Menu.js";

import { MenuPage } from "./blocks/menuPage/menuPage.js";
import ProductItem from "./blocks/productItem/productItem.js";

globalThis.app = {};

app.store = Store;
app.router = Router;

window.addEventListener("DOMContentLoaded", () => {

  app.router.init();
});

window.addEventListener("appcartchange", (event) => {
  const badge = document.getElementById("badge");
  const qty = app.store.cart.reduce((acc, item) => acc + item.quantity, 0);
  badge.textContent = qty;
  badge.hidden = qty == 0;
});

const callback = (entries) => {
  entries.forEach(entry => {
    const element = entry.target;
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;

    if (width < 150 || height < 150) {
      element.classList.remove('box');
      element.classList.add('box--small');
    } else {
      element.classList.remove('box--small');
      element.classList.add('box');
    }
  });
}

const observer = new ResizeObserver(callback);

// Obtener todos los elementos con clase 'box'
const boxes = document.querySelectorAll('.box');

// Observar cada elemento
boxes.forEach(box => {
  observer.observe(box);
});