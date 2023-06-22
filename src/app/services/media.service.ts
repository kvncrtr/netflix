import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, Subject } from "rxjs";
import { map, retry } from 'rxjs/operators'

import { Media } from '../interfaces/media.interface'

@Injectable({
   providedIn: 'root'
})
export class MediaService {
   url: string = 'https://netflix-clone-fire-8079b-default-rtdb.firebaseio.com/';
  jsonExt: string = '.json';
  mediaData: Media[] = [];
   
   constructor(private http: HttpClient) {};

   fetchData(): Subject<Media[]> {
      const subject = new Subject<Media[]>();
  
      this.http.get<Media>(`${this.url}${this.jsonExt}`)
        .pipe(
          map(responseData => {
            const setupArray = Object.entries(responseData);
            const mediaArray: Media[] = [];
  
            for (const key in setupArray) {
              const mediaObj = Object.fromEntries(setupArray);
              mediaArray.push({ ...mediaObj[key], id: key });
            };
            return mediaArray;
          })
        )
        .subscribe(data => {
          subject.next(data);
        });
  
      return subject;
   }
}