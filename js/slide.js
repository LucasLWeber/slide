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
    let moveType;
    if (e.type === 'mousedown') {
      e.preventDefault();
      this.dist.startX = e.clientX;
      moveType = 'mousemove';
    } else {
      this.dist.startX = e.changedTouches[0].clientX;
      console.log(this.dist.startX);
      moveType = 'touchmove';
    }
    this.wrapper.addEventListener(moveType, this.onMove);
  }

  onEnd(e) {
    const moveType = (e.type === 'mouseup') ? 'mousemove' : 'touchmove';
    this.wrapper.removeEventListener(moveType, this.onMove);
    this.dist.finalPosition = this.dist.movePosition;
  }

  onMove(e) {
    const pointerPosition = (e.type === 'mousemove') ? e.clientX : e.changedTouches[0].clientX;
    const finalPosition = this.updatePosition(pointerPosition);
    this.moveSlide(finalPosition);
  }

  addSlidEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('touchstart', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
    this.wrapper.addEventListener('touchend', this.onEnd);
  }

  // Slides Config

  slidesIndexNav(index){
    const last = this.slideArray.length - 1;
    this.index = { 
      prev: index ? index - 1 : undefined,
      active: index,
      next: (index === last) ? undefined : index + 1,
    }
  }

  changeSlide(index){
    const activeSlide = this.slideArray[index]; 
    this.moveSlide(this.slideArray[index].position);
    this.slidesIndexNav(index);
    this.dist.finalPosition = activeSlide.position;
  }

  slidePosition(slide){
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesConfig(){
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.slidePosition(element)
      return { element, position }
    });
  }

  init() {
    this.bindEvents();
    this.addSlidEvents();
    this.slidesConfig();
    return this;
  }
}