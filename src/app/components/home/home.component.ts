import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  @ViewChild('innerSlider') innerSlider!: ElementRef;

  pressed = false;
  startX = 0;
  x = 0;

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.pressed = true;
    const innerSliderOffsetLeft = this.innerSlider.nativeElement.offsetLeft;
    this.startX = event.offsetX - innerSliderOffsetLeft;
    this.sliderContainer.nativeElement.style.cursor = 'grabbing';
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.sliderContainer.nativeElement.style.cursor = 'grab';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.sliderContainer.nativeElement.style.cursor = 'default';
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.sliderContainer.nativeElement.style.cursor = 'grab';
    this.pressed = false;
  }

  @HostListener('window:mouseup')
  onWindowMouseUp() {
    // this.pressed = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.pressed) return;
    event.preventDefault();

    this.x = event.offsetX;

    this.innerSlider.nativeElement.style.left = `${this.x - this.startX}px`;

    this.checkBoundary();
  }

  checkBoundary() {
    const outer = this.sliderContainer.nativeElement.getBoundingClientRect();
    const inner = this.innerSlider.nativeElement.getBoundingClientRect();

    if (parseInt(this.innerSlider.nativeElement.style.left) > 0) {
      this.innerSlider.nativeElement.style.left = '0px';
    }

    if (inner.right < outer.right) {
      this.innerSlider.nativeElement.style.left = `-${inner.width - outer.width}px`;
    }
  }
}
