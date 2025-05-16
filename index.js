// TODO: Use the DOM API to create the card components
const html = `<article class="card">
<h3 class="card__title"></h3>
<div class="card__body">
  <div class='card__body__image'></div>
  <section class='card__body__content'>
  </section>
</div>
</article>`;

// 1. Seleccione el container
const container = document.getElementById("container");
// 2. cree una funciotn createCardComponent.
function createCardComponent(title, body) {
  const template = document.createElement("div");
  template.innerHTML = html;
  const card = template.firstElementChild;
  card.querySelector(".card__title").textContent = title;
  card.querySelector(".card__body__content").textContent = body;
  return card;
}
/**
 * @param {string} title
 * @param {string} body
 *
 * @return {HTMLElement}
 */

// 3. Cree un componente

const newCard = createCardComponent("Título 1", "Desc. 1");

// 4. Agrege este nuevo componente al container
container.appendChild(newCard);
