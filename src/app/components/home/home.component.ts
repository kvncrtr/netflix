import { Component, OnInit } from '@angular/core';

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

  constructor(public mediaService: MediaService) {}
  
  ngOnInit(): void {
    this.getMedia()
  }
  
  getMedia() : void {
    const subject = this.mediaService.fetchData();
    
    subject.subscribe((data: Media[]) => {
      this.homeData = data
    })
  }
}

/*

*/