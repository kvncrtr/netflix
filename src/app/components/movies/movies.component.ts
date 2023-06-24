import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';
import { OauthService } from 'src/app/services/oauth.service';

import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  isLoggedIn: string = this.oauth.getKeyValue('isLoggedIn');
  searchTerm: string;
  movieData: Media[] = [];
  defaultMovieData: Media[] = [];
  memorySubject: any;

  constructor(
      private mediaService: MediaService, 
      private searchService: SearchService,
      private oauth: OauthService,
      private router: Router) {
    this.searchTerm = this.searchService.getSearchTerm();

    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.filterMovies();
    })
  }

  ngOnInit(): void {
    this.getMoviesData()
    this.onUpdateView()
  }

  getMoviesData(): void {
    const subject = this.mediaService.fetchData()

    subject.subscribe(data => {
      this.defaultMovieData = data.filter(item => item.category === 'Movie');
      this.filterMovies();
    });
  }

  onUpdateView() {
    this.mediaService.currentMemory.subscribe(memory => {
      this.memorySubject = memory;
      if (this.memorySubject != null) {
        for (const index in this.movieData) {
          if (this.movieData[index].id === this.memorySubject.id) {
             this.movieData.splice(parseFloat(index), 1, this.memorySubject)
          }
        }
       }
    })
  }
  // console.log()

  filterMovies(): void {
    if (this.searchTerm) {
      this.movieData = this.defaultMovieData.filter(item => 
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.movieData = this.defaultMovieData;
    }
  }
}