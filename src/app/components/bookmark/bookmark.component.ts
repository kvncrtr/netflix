import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MediaService } from 'src/app/services/media.service';
import { OauthService } from 'src/app/services/oauth.service';

import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent {
  isLoggedIn: string = this.oauth.getKeyValue('isLoggedIn');
  searchTerm: string;
  defaultBookmarkedMovies: any = [];
  defaultBookmarkedSeries: any = [];
  bookmarkedMovies: any = []
  bookmarkedSeries: any = []
  memorySubject: any;

  constructor(
    public mediaService: MediaService, 
    private searchService: SearchService,
    private oauth: OauthService,
    private router: Router) {
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