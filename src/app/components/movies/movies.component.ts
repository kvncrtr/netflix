import { Component } from '@angular/core';

import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent {
  movieData: Media[] = [];

  constructor(
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.getMoviesData()
  }

  getMoviesData(): void {
    const subject = this.mediaService.fetchData()

    subject.subscribe(data => {
      data.reduce((prev: any, current: Media) => {
        if (current.category === "Movie") {
          prev.push(current)
          this.movieData = prev
        }
        return this.movieData 
      }, this.movieData)
    })
  }
}
