export class Home extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/blocks/MenuPage/MenuPage.css");
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
    this.render();
  }

  render() {
    if (app.store.menu) {
      this.root.querySelector("#menu").innerHTML = `<div style="width:100%">
      <h1>Página de pedidos de comida</h1>
      <p>Esta página es un ejercicio para ver las capacidades de implementar webComponents, Routers y otros. Debería hacerlo en inglés?????????</p>
      <h3>Nuestro producto y restaurante estrella:</h3> </div>
      `;
      let product = app.store.menu[0];
      const item = document.createElement("product-item");
      item.dataset.product = JSON.stringify(product);
      this.root.querySelector("#menu").appendChild(item);
      product = app.store.menu[1]
      const item2 = document.createElement("restaurant-item");
      item2.dataset.product = JSON.stringify(product);
      this.root.querySelector("#menu").appendChild(item2);

    } else {
      this.root.querySelector("#menu").innerHTML = "Loading...";
    }
  }
}

customElements.define("home-menu", Home);
