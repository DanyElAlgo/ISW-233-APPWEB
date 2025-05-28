export class RestaurantPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });

    const styles = document.createElement("style");
    this.root.appendChild(styles);

    async function loadCSS() {
      const request = await fetch("/blocks/restaurantPage/restaurantPage.css");
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
      this.root.querySelector("#menu").innerHTML = "";
      for (let product of app.store.menu) {
        const item = document.createElement("restaurant-item");
        item.dataset.product = JSON.stringify(product);
        this.root.querySelector("#menu").appendChild(item);
      }
    } else {
      this.root.querySelector("#restaurants").innerHTML = "Loading...";
    }
  }
}

customElements.define("restaurant-page", RestaurantPage);
