import { Component } from '@angular/core';

import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';

import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent {
  searchTerm: string;
  defaultBookmarkedMovies: any = [];
  defaultBookmarkedSeries: any = [];
  bookmarkedMovies: any = []
  bookmarkedSeries: any = []
  memorySubject: any;

  constructor(public mediaService: MediaService, private searchService: SearchService) {
    this.searchTerm = this.searchService.getSearchTerm();

    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.filterData();
    })
  }
  
  ngOnInit(): void {
    this.getMedia()
    this.onUpdateView()
  }
  
  getMedia() : void {
    const subject = this.mediaService.fetchData();

    subject.subscribe(data => {
      this.defaultBookmarkedMovies = data.filter(item => item.category === "Movie" && item.isBookmarked);
      this.defaultBookmarkedSeries = data.filter(item => item.category === "TV Series" && item.isBookmarked);
      this.filterData();
    })
  }

  onUpdateView() {
    this.mediaService.currentMemory.subscribe(memory => {
      this.memorySubject = memory
      if (this.memorySubject != null) {
        for (const index in this.bookmarkedMovies) {
          if (this.bookmarkedMovies[index].id == this.memorySubject.id) {
            this.bookmarkedMovies.splice(parseFloat(index), 1)
          }
        }
      }
    })
  }

  filterData() {
    if (this.searchTerm) {
      this.bookmarkedMovies = this.defaultBookmarkedMovies.filter(item =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.bookmarkedMovies = this.defaultBookmarkedMovies;
    }

    if (this.searchTerm) {
      this.bookmarkedSeries = this.defaultBookmarkedSeries.filter(item =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.bookmarkedSeries = this.defaultBookmarkedSeries;
    }
  }
}