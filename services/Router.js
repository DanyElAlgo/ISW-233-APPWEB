const Router = {
  init: () => {
    document.querySelectorAll("a.nav__link").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        Router.go(href);
      });
    });
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
    Router.go(location.pathname);
  },

  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("home-menu");
        window.dispatchEvent(new Event("loadHighlights"));
        break;
      case "/products":
        pageElement = document.createElement("menu-page");
        window.dispatchEvent(new Event("loadProducts"));
        break;
      case "/restaurants":
        pageElement = document.createElement("restaurant-page");
        window.dispatchEvent(new Event("loadRestaurants"));
        break;
      case "/order":
        pageElement = document.createElement("order-page")
        break;
      default:
        if (route.startsWith("/products/")) {
          const paramId = route.substring(route.lastIndexOf("/") + 1);
          pageElement = document.createElement("product-page");

          pageElement.dataset.productId = paramId;
        }
        break;
    }
    if (pageElement) {
      let currentPage = document.querySelector("main").firstElementChild;
      if (currentPage) {
        currentPage.remove();
        document.querySelector("main").appendChild(pageElement);
      } else {
        document.querySelector("main").appendChild(pageElement);
      }
    }

    window.scrollY = 0;
    window.scrollX = 0;
  },
};

export default Router;
