import { Component, OnInit } from '@angular/core';

import { MediaService } from 'src/app/services/media.service';
import { Media } from 'src/app/interfaces/media.interface';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.css']
})
export class TvSeriesComponent implements OnInit {
  seriesData: any = [];

  constructor(private mediaService: MediaService) {};
  
  ngOnInit(): void {
    this.getSeriesData()
  }

  getSeriesData(): void {
    const subject = this.mediaService.fetchData()
    
    subject.subscribe(data => {
      data.reduce((prev:any, current: Media) => {
        if (current.category === "TV Series") {
          prev.push(current);
          this.seriesData = prev;
        }
        return this.seriesData
      }, this.seriesData)

    })

  }

};