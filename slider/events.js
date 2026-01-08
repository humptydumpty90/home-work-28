class ClickEvents {
  #prevFn = null;
  #nextFn = null;
  #playFn = null;
  #pointsFn = null;

  constructor({ state, template }) {
    this.state = state;
    this.template = template;
  }

  onPrev(handlePrev) {
    this.#prevFn = handlePrev;
    this.template.elements.buttons.prev.addEventListener('click', this.#prevFn);
  }

  onNext(handleNext) {
    this.#nextFn = handleNext;
    this.template.elements.buttons.next.addEventListener('click', this.#nextFn);
  }

  onPlay(actions) {
    this.#playFn = () => {
      const mode = this.state.toggleMode();

      actions[mode](mode);
    };

    this.template.elements.buttons.play.addEventListener('click', this.#playFn);
  }

  onPoint(handlePoint) {
    this.#pointsFn = (event) => {
      event.target.closest('span') && handlePoint(event.target.dataset.index);
    };
    this.template.elements.points.container.addEventListener('click', this.#pointsFn);
  }

  destroy() {
    this.template.elements.buttons.prev.removeEventListener('click', this.#prevFn);
    this.template.elements.buttons.next.removeEventListener('click', this.#nextFn);
    this.template.elements.buttons.play.removeEventListener('click', this.#playFn);
    this.template.elements.points.container.removeEventListener('click', this.#pointsFn);

    this.#prevFn = null;
    this.#nextFn = null;
    this.#playFn = null;
    this.#pointsFn = null;
  }
}

class SwipeEvents {
  #mousedownFn = null;
  #mouseupFn = null;

  constructor({ state, template }) {
    this.state = state;
    this.template = template;
  }

  swipe(swipes) {
    let startPositionX = 0;
    const getX = (e) => e.offsetX || e.changedTouches?.[0].pageX;

    this.#mousedownFn = (e) => {
      e.preventDefault();

      startPositionX = getX(e);
    };

    this.#mouseupFn = (e) => {
      e.preventDefault();

      getX(e) < startPositionX ? swipes.toLeft() : swipes.toRight();

      startPositionX = 0;
    };

    this.template.elements.list.addEventListener('mousedown', this.#mousedownFn);
    this.template.elements.list.addEventListener('mouseup', this.#mouseupFn);
    this.template.elements.list.addEventListener('touchstart', this.#mousedownFn);
    this.template.elements.list.addEventListener('touchend', this.#mouseupFn);
  }

  destroy() {
    this.template.elements.list.removeEventListener('mousedown', this.#mousedownFn);
    this.template.elements.list.removeEventListener('mouseup', this.#mouseupFn);
    this.template.elements.list.removeEventListener('touchstart', this.#mousedownFn);
    this.template.elements.list.removeEventListener('touchend', this.#mouseupFn);
  }
}

class IntervalEvents {
  #timer = null;
  constructor({ state, template }) {
    this.state = state;
    this.template = template;
  }

  start(handleInterval) {
    this.#timer = setInterval(handleInterval, this.state.getInterval());
  }

  stop() {
    clearInterval(this.#timer);
  }

  destroy() {
    this.stop();
  }
}

class Events {
  #click = null;
  #swipes = null;
  #interval = null;

  constructor({ state, template }) {
    this.state = state;
    this.template = template;
  }

  init() {
    this.#click = new ClickEvents({ state: this.state, template: this.template });
    this.#swipes = new SwipeEvents({ state: this.state, template: this.template });
    this.#interval = new IntervalEvents({ state: this.state, template: this.template });

    return {
      click: this.#click,
      swipes: this.#swipes,
      interval: this.#interval,
    };
  }
  destroy() {
    this.#click.destroy();
    this.#swipes.destroy();
    this.#interval.destroy();
  }
}
