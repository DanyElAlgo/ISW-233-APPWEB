export class MenuPage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.template = document.getElementById("menu-page-template");

    this.loadMoreCallback = this.loadMore.bind(this);
    const styles = document.createElement("style");
    this.root.appendChild(styles);
    async function loadCSS() {
      const request = await fetch("/blocks/MenuPage/MenuPage.css");
      const css = await request.text();
      styles.textContent = css;
    }
    loadCSS();
  }

  connectedCallback() {
    this.render();
    this.setupInfiniteScroll();
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  async render() {
    const content = this.template.content.cloneNode(true);
    this.root.appendChild(content);
    
    this.menuList = this.root.querySelector("#menu");
    
    const loaderTemplate = document.getElementById("loader-template");
    this.loader = loaderTemplate.content.cloneNode(true);
    this.menuList.appendChild(this.loader);
  }

  setupInfiniteScroll() {
    const options = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadMore();
        }
      });
    }, options);

    const loaderElement = this.root.querySelector(".loader__trigger");
    if (loaderElement) {
      this.observer.observe(loaderElement);

    }
  }

  async loadMore() {
    if (this.loading) return;
    this.loading = true;

    try {
      const newData = await app.store.db.next();
      
      if (newData && newData.length > 0) {
        const fragment = document.createDocumentFragment();
        
        newData.forEach(item => {
          const productItem = document.createElement("product-item");
          productItem.dataset.product = JSON.stringify(item);
          fragment.appendChild(productItem);
        });

        const loaderElement = this.root.querySelector(".loader__trigger");
        if (loaderElement) {
          loaderElement.parentNode.insertBefore(fragment, loaderElement);
        }
      } else {
        const loaderElement = this.root.querySelector(".loader__trigger");
        if (loaderElement) {
          loaderElement.remove();
        }
        if (this.observer) {
          this.observer.disconnect();
        }
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      this.loading = false;
    }
  }
}

customElements.define("menu-page", MenuPage);