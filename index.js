// TODO: Use the DOM API to create the card components

const container = document.getElementById("container");
function createCardComponent(title, body) {
  const template = document.getElementById("card__container");
  const copy = template.content.cloneNode(true).firstElementChild;
  copy.querySelector(".card__title").textContent = title;
  copy.querySelector(".card__body__content").textContent = body;
  container.appendChild(copy);
}

createCardComponent("Título 1", "Desc. 1");