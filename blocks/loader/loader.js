export class Loader extends HTMLElement {
    constructor() {
        super();
        this.observer = null;
    }

    connectedCallback() {
        const template = document.getElementById("loader-template");
        const content = template.content.cloneNode(true);
        this.appendChild(content);

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.dispatchEvent(new CustomEvent('loadmore', {
                        bubbles: true,
                        composed: true
                    }));
                }
            });
        }, {
            threshold: 0.1
        });

        this.observer.observe(this.querySelector('.loader__trigger'));
    }

    disconnectedCallback() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

customElements.define("loader", Loader);