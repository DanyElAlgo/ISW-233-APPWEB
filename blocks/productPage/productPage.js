import { getProductById } from "../../services/Menu.js";
import { addToCart } from "../../services/Order.js";

export default class ProductPage extends HTMLElement {

  MAX_VALUE = 99;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.qtty = 1;
  }

  async connectedCallback() {
    const template = document.getElementById("product-template");
    const content = template.content.cloneNode(true);
    this.root.appendChild(content);

    const product = await getProductById(parseInt(this.dataset.productId));

    this.root.querySelector("h3").textContent = product.title;
    this.root.querySelector("img").src = product.imageUrl;
    this.root.querySelector("p.product__description")
        .textContent = product.description;
    this.root.querySelector("p.product__price")
        .textContent = `$${product.price}`;

    const quantityInput = this.root.querySelector(".product__quantity-input");
    quantityInput.value = this.qtty;

    this.root.querySelector(".product").addEventListener("click", (event) => {
      if (event.target.tagName.toLowerCase() == "button") {
        addToCart(product.id, this.qtty);
      }
      event.preventDefault();
    });

    quantityInput.addEventListener("change", (event) => {
      if(parseInt(event.target.value) > 99){
        event.target.value = 99;
      }
      if(parseInt(event.target.value) < 1){
        event.target.value = 1;
      }
      this.qtty = parseInt(event.target.value);
      event.preventDefault();
    });
  }
}

customElements.define("product-page", ProductPage);
