class Navigation {
  constructor({ state }) {
    this.state = state;
  }

  getStep(index) {
    return index - this.state.getNumberOfSlides() * Math.floor(index / this.state.getNumberOfSlides());
  }

  nextStep() {
    return this.getStep(this.state.increaseIndex());
  }

  prevStep() {
    return this.getStep(this.state.decreaseIndex());
  }

  moveTo(index) {
    return this.getStep(this.state.setIndex(index));
  }

  getCurrentStep() {
    return this.getStep(this.state.getIndex());
  }
}
