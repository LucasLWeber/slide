export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPosition: 0, startX: 0, movement: 0 }
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  moveSlide(distX) {
    this.dist.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  updatePosition(clientX) {
    this.dist.movement = (clientX - this.dist.startX) * 1.8;
    return this.dist.finalPosition + this.dist.movement;
  }

  onStart(e) {
    e.preventDefault();
    this.dist.startX = e.clientX;
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onEnd(e) {
    this.wrapper.removeEventListener('mousemove', this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  onMove(e) {
    const finalPosition = this.updatePosition(e.clientX);
    this.moveSlide(finalPosition);
  }

  addSlidEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  init() {
    this.bindEvents();
    this.addSlidEvents();
    return this;
  }
}