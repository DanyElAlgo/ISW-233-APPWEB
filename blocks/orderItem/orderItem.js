import { addToCart, removeFromCart } from "../../services/Order.js";

export default class OrderItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("order-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);
    if (app.store.cart) {
      const orderData = JSON.parse(this.dataset.product);
      const product = orderData.product;
      const quantity = orderData.quantity;

      this.querySelector("h3").textContent = product.name;
      this.querySelector("img").src = `${product.imageUrl}`;
      this.querySelector("p.order-item__price").textContent = `${product.price}`;
      this.querySelector("p.order-item__quantity").textContent = `${quantity}`;

      this.querySelector(".order-item").addEventListener("click", (event) => {
        if (event.target.className.toLowerCase() == "order-item__button--add") {
          addToCart(product.id);
        } else if (event.target.className.toLowerCase() == "order-item__button") {
          removeFromCart(product.id);
        }
        event.preventDefault();
      });
    } else {
      console.log("Carrito vacío :c");
    }
  }
}

customElements.define("order-item", OrderItem);
