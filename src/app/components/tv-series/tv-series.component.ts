import { Component, OnInit } from '@angular/core';

import { MediaService } from 'src/app/services/media.service';
import { Media } from 'src/app/interfaces/media.interface';

import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-tv-series',
  templateUrl: './tv-series.component.html',
  styleUrls: ['./tv-series.component.css']
})
export class TvSeriesComponent implements OnInit {
  searchTerm: string;
  seriesData: any = [];
  defaultSeriesData: Media[] = [];
  memorySubject: any;

  constructor(private mediaService: MediaService, private searchService: SearchService) {
    this.searchTerm = this.searchService.getSearchTerm();

    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.filterSeries();
    })
  };
  
  ngOnInit(): void {
    this.getSeriesData()
    this.updateView()
  }

  updateView() {
    this.mediaService.currentMemory.subscribe(memory => {
      this.memorySubject = memory

      if (this.memorySubject != null) {
        for (const index in this.seriesData) {
          if (this.seriesData[index].id == this.memorySubject.id) {
            this.seriesData.splice(parseFloat(index), 1, this.memorySubject)
          }
        }
      }
    })
  }

  getSeriesData(): void {
    const subject = this.mediaService.fetchData()
    
    subject.subscribe(data => {
      this.defaultSeriesData = data.filter(item => item.category === 'TV Series');
      this.filterSeries();
    });
  }

  filterSeries(): void {
    if (this.searchTerm) {
      this.seriesData = this.defaultSeriesData.filter(item =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.seriesData = this.defaultSeriesData;
    }
  }
};