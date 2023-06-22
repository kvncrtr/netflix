import { Component } from '@angular/core';

import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent {
  bookmarkedMovies: any = []
  bookmarkedSeries: any = []

  constructor(public mediaService: MediaService) {}
  
  ngOnInit(): void {
    this.getMedia()
  }
  
  getMedia() : void {
    const subject = this.mediaService.fetchData();
    
    subject.subscribe((data: any) => {
      data.reduce((prev: any, current: Media) => {
        if(current.category === "Movie" && current.isBookmarked) {
          this.bookmarkedMovies.push(current)
        } else if(current.category === "TV Series" && current.isBookmarked) {
          this.bookmarkedSeries.push(current)
        }
      }, [])
    })
  }
}
