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
    console.log(app.store.cart);

    

    window.addEventListener("appmenuchange", () => {
      this.render();
    });
    window.addEventListener("appcartchange", () => {
      this.render();
    });
    this.render();
    
  }

  render() {
    if (app.store.cart && app.store.cart.length > 0) { // Verificar que el carrito tenga items
      this.root.querySelector("#menu").innerHTML = "";
      for (let product of app.store.cart) {
        const item = document.createElement("order-item");
        item.dataset.product = JSON.stringify(product);
        this.root.querySelector("#menu").appendChild(item);
      }
      
      const lower = this.root.querySelector("#lower");
      if (lower) {
        lower.innerHTML = `<button class="confirm-order">Order Now!</button>`;
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
