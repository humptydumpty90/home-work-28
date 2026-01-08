class Slider {
  constructor({ state, template, navigation, events, render }) {
    this.state = state;
    this.template = template;
    this.navigation = navigation;
    this.events = events;
    this.render = render;
  }

  init(elements, options) {
    this.state.setDuration(options.duration);
    this.state.setInterval(options.interval);
    this.state.generateSliderID();
    this.template.init(elements);

    const eventsInitiation = this.events.init();

    this.render.render();
    this.render.renderPlay(this.state.getMode());

    eventsInitiation.click.onPrev(() => {
      this.render.render(this.navigation.prevStep.bind(this.navigation));
    });
    eventsInitiation.click.onNext(() => {
      this.render.render(this.navigation.nextStep.bind(this.navigation));
    });

    eventsInitiation.click.onPoint((index) => {
      this.render.render(() => this.navigation.moveTo(index));
    });

    eventsInitiation.click.onPlay({
      play: (mode) => {
        this.render.renderPlay(mode);

        eventsInitiation.interval.start(() => {
          this.render.render(this.navigation.nextStep.bind(this.navigation));
        });
      },
      pause: (mode) => {
        this.render.renderPlay(mode);

        eventsInitiation.interval.stop();
      },
    });

    eventsInitiation.swipes.swipe({
      toLeft: () => {
        this.render.render(this.navigation.prevStep.bind(this.navigation));
      },
      toRight: () => {
        this.render.render(this.navigation.nextStep.bind(this.navigation));
      },
    });

    eventsInitiation.interval.start(() => {
      this.render.render(this.navigation.nextStep.bind(this.navigation));
    });
  }

  destroy() {
    this.events.destroy();
  }

  static create() {
    const state = new State();
    const template = new Template({ state });
    const navigation = new Navigation({ state });
    const events = new Events({ state, template });
    const render = new Render({ navigation, template });

    const slider = new Slider({
      state,
      template,
      navigation,
      events,
      render,
    });

    return slider;
  }
}
