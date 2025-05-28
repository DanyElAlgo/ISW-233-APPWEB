export const API = {
  url: "./data/products.json",
  getProducts: async () => {
    const response = await fetch(API.url);
    return await response.json();
  },
  urlRestaurants: "./data/restaurants.json",
  getRestaurants: async () => {
    const response = await fetch(API.urlRestaurants);
    return await response.json();
  },
  urlHighlights: "./data/highlights.json",
  getHighlights: async() => {
    const response = await fetch(API.urlHighlights);
    return await response.json();
  }
};
