import { cleanCart } from "../../services/Order.js";

export class OrderPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/blocks/orderPage/orderPage.css");
      //TODO: Cambiar
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }

  // when the component is attached to the DOM
connectedCallback() {
    const template = document.getElementById("menu-page-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    window.addEventListener("appmenuchange", () => {
      this.render();
    });
    window.addEventListener("appcartchange", () => {
      this.render();
    });

    this.root.addEventListener("click", (event) => {
      if (event.target.classList.contains("confirm-order")) {
        cleanCart();
        app.router.go("/products");
        event.preventDefault();
      }
    });

    this.render();
}

  render() {
    let total = 0;
    if (app.store.cart && app.store.cart.length > 0) {

      this.root.querySelector("#menu").innerHTML = "";
      for (let product of app.store.cart) {
        const item = document.createElement("order-item");
        item.dataset.product = JSON.stringify(product);
        this.root.querySelector("#menu").appendChild(item);
        total += product.quantity * product.product.price;
      }

      const lower = this.root.querySelector("#lower");
      if (lower) {
        lower.innerHTML = `<p>Total: \$${total.toFixed(2)}</p><button class="confirm-order">Order Now!</button>`;
      }
    } else {
      this.root.querySelector("#menu").innerHTML = "Your cart is empty";
      const lower = this.root.querySelector("#lower");
      if (lower) {
        lower.innerHTML = "";
      }
    }
  }
}

customElements.define("order-page", OrderPage);
