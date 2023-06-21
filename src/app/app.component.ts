import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Media } from 'src/interfaces/media.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  url: string = 'https://netflix-clone-fire-8079b-default-rtdb.firebaseio.com/';
  jsonExt: string = '.json'

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMedia()
  }

  fetchMedia(): void {
    this.http.get(`${this.url}${this.jsonExt}`)
    .pipe(
     map((responseData) => {
      const setupArray = Object.entries(responseData);
      const mediaArray: any = [];
      
      for (const key in setupArray) {
        const mediaObj = Object.fromEntries(setupArray)
        mediaArray.push({ ...mediaObj[key], id: key })
      }
      return mediaArray
     })
    )
    .subscribe(media => {
      console.log('sub method => ', media)
    })
  }
}
