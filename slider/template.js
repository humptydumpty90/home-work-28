const SLIDER = 'slider';
const SLIDER_CONTROLS = 'slider-controls';
const SLIDER_PLAY = 'slider-play';
const SLIDER_PREV = 'slider-prev';
const SLIDER_NEXT = 'slider-next';
const SLIDER_POINTS = 'slider-points';
const SLIDER_LIST = 'slider-list';

class Template {
  constructor({ state }) {
    this.state = state;
    this.elements = {
      container: null,
      items: null,
      list: null,
      points: { container: null, items: null },
      buttons: { prev: null, next: null, play: null },
    };
  }

  init(elements) {
    this.#setElements(elements);
    this.#createAnimation();

    this.elements.list = document.getElementById(this.#convertOriginalID(SLIDER_LIST));
    this.elements.buttons.prev = document.getElementById(this.#convertOriginalID(SLIDER_PREV));
    this.elements.buttons.next = document.getElementById(this.#convertOriginalID(SLIDER_NEXT));
    this.elements.buttons.play = document.getElementById(this.#convertOriginalID(SLIDER_PLAY));
    this.elements.points.container = document.getElementById(this.#convertOriginalID(SLIDER_POINTS));
    this.elements.points.items = this.elements.points.container.children;
  }

  #setElements({ container, items }) {
    this.elements.container = document.querySelector(container);
    this.state.setNumberOfSlides(this.elements.container.children.length);

    const controlsHTML = this.#createControlsHTML();
    const sliderListHTML = this.#createSlideListHTML();

    this.elements.container.innerHTML = `${controlsHTML} ${sliderListHTML} `;

    this.elements.items = document.querySelectorAll(items);
  }
  #createSlideListHTML() {
    const itemsHTML = this.elements.container.innerHTML;
    const slideListHTML = `
            <div id=${this.#convertOriginalID(SLIDER_LIST)} class="slider-list">
             ${itemsHTML}
            </div>
        `;

    return slideListHTML;
  }
  #createControlsHTML() {
    const controlsHTML = `
            <div id="${this.#convertOriginalID(SLIDER_CONTROLS)}" class="slider-controls">
                <button id="${this.#convertOriginalID(SLIDER_PLAY)}" class="slider-controls__btn slider-controls__btn--play"><i class="fa-solid fa-circle-pause"></i></button>
                <button id="${this.#convertOriginalID(SLIDER_PREV)}" class="slider-controls__btn slider-controls__btn--prev"><i class="fa-solid fa-circle-arrow-left"></i></button>
                <button id="${this.#convertOriginalID(SLIDER_NEXT)}" class="slider-controls__btn slider-controls__btn--next"><i class="fa-solid fa-circle-arrow-right"></i></button>
                <div id="${this.#convertOriginalID(SLIDER_POINTS)}" class="slider-points">
                    ${this.#createPointsHTML()}
                </div>
            </div>
        `;

    return controlsHTML;
  }

  #createPointsHTML() {
    const pointsHTML = new Array(this.state.getNumberOfSlides()).fill(0).reduce((template, _, index) => {
      return `${template}<span data-index='${index}'></span>`;
    }, '');

    return pointsHTML;
  }

  #createAnimation() {
    this.elements.items.forEach((item) => {
      item.style.opacity = 0;
      item.style.transition = `all ${this.state.getDuration()}ms ease-in-out`;
    });
  }
  #convertOriginalID(originalID) {
    return convertOriginalID(this.state.getSliderID(), originalID);
  }
}
