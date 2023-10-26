export default class Slide {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
  }

  bindEvents(){
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  onStart(e){
    e.preventDefault();
    this.wrapper.addEventListener('mousemove', this.onMove);
  }

  onEnd(e){
    this.wrapper.removeEventListener('mousemove', this.onMove);
  }

  onMove(e){
  }

  addSlidEvents(){
    this.wrapper.addEventListener('mousedown', this.onStart);
    this.wrapper.addEventListener('mouseup', this.onEnd);
  }

  init(){
    this.bindEvents();
    this.addSlidEvents();
    return this;
  }
}