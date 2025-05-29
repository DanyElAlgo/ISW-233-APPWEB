const Store = {
  menu: [],
  cart: [],
  currentPage: 0,
  itemsPerPage: 5,

  async loadNextPage() {
    try {
      const response = await fetch("/data/products.json");
      const allProducts = await response.json();

      const start = this.currentPage * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const nextItems = allProducts.slice(start, end);

      if (nextItems.length > 0) {
        this.currentPage++;
        this.menu = [...this.menu, ...nextItems];
        return nextItems;
      }

      return [];
    } catch (error) {
      console.error("Error loading next page:", error);
      return [];
    }
  },
};

export default Store;
