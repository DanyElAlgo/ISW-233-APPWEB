import { addToCart } from "../../services/Order.js";

export default class RestaurantItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("restaurant-card-template");
    const content = template.content.cloneNode(true);

    this.appendChild(content);

    const product = JSON.parse(this.dataset.product);
    this.querySelector("h3").textContent = product.name;
    this.querySelector("img").src = `${product.imageUrl}`;
    this.querySelector("p.restaurant-card__description").textContent = `${product.description}`;
    this.querySelector("p.restaurant-card__price").textContent = `${product.address}`;

    this.querySelector(".restaurant-card").addEventListener("click", (event) => {
      app.router.go(`/restaurants/${product.id}`); //TODO: Implementar restaurante por id
      event.preventDefault();
    });
  }
}

customElements.define("restaurant-item", RestaurantItem);


// TODO: Cambiar el nombre de las variables para que concuerden con restaurante