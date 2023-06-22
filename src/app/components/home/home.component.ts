import { Component, HostListener, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isFetching: boolean = false;
  homeData: any;
  trendingData: Media[] = [];

  constructor(public mediaService: MediaService) {}
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
  ngOnInit(): void {
    this.getMedia()
  }  

  getMedia() : void {
    const subject = this.mediaService.fetchData();
    
    subject.subscribe(data => {
      this.homeData = data
      data.reduce((prev: any, current: Media) => {
        if (current.isTrending) {
          prev.push(current)
          return this.trendingData = prev
        }
        return this.trendingData
      }, this.trendingData)
      console.log(this.trendingData)
    })
  }
}

/*

*/