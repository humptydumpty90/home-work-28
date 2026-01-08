class Render {
  constructor({ navigation, template }) {
    this.navigation = navigation;
    this.template = template;
  }
  render(action = () => {}) {
    const prevIndex = this.navigation.getCurrentStep();
    action();
    const currentIndex = this.navigation.getCurrentStep();
    this.#renderSlide({
      prevIndex,
      currentIndex,
    });
    this.#renderPoints({
      prevIndex,
      currentIndex,
    });
  }
  renderPlay(mode) {
    const iconTag = this.template.elements.buttons.play.children[0];
    if (mode === 'pause') {
      iconTag.classList.contains('fa-circle-pause') && iconTag.classList.remove('fa-circle-pause');
      !iconTag.classList.contains('fa-circle-play') && iconTag.classList.add('fa-circle-play');
    } else {
      iconTag.classList.contains('fa-circle-play') && iconTag.classList.remove('fa-circle-play');
      !iconTag.classList.contains('fa-circle-pause') && iconTag.classList.add('fa-circle-pause');
    }
  }
  #renderSlide({ prevIndex, currentIndex }) {
    this.template.elements.items[prevIndex].style.opacity = 0;
    this.template.elements.items[currentIndex].style.opacity = 1;
  }
  #renderPoints({ prevIndex, currentIndex }) {
    this.template.elements.points.items[prevIndex].classList.remove('active');
    this.template.elements.points.items[currentIndex].classList.add('active');
  }
}
