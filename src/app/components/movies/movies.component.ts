import { Component } from '@angular/core';

import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';

import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  searchTerm: string;
  movieData: Media[] = [];
  defaultMovieData: Media[] = [];

  constructor(private mediaService: MediaService, private searchService: SearchService) {
    this.searchTerm = this.searchService.getSearchTerm();

    this.searchService.searchTerm$.subscribe(term => {
      this.searchTerm = term;
      this.filterMovies();
    })
  }

  ngOnInit(): void {
    this.getMoviesData()
  }

  getMoviesData(): void {
    const subject = this.mediaService.fetchData()

    subject.subscribe(data => {
      this.defaultMovieData = data.filter(item => item.category === 'Movie');
      this.filterMovies();
    });
  }

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
