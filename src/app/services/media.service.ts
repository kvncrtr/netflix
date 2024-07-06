import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, tap } from 'rxjs/operators'

import { Media } from '../interfaces/media.interface'
import { User } from '../interfaces/user.interface'

@Injectable({
   providedIn: 'root'
})
export class MediaService {
  url: string = 'http://localhost:3000/movies/';
  usersUrl: string = 'http://localhost:3000/users/';
  
  mediaData: Media[] = [];
  memory: object = {}
  uuid = localStorage.getItem('uuid');

  private bookmarkSubject: BehaviorSubject<Media[]> = new BehaviorSubject<Media[]>([])

  constructor(private http: HttpClient) {}

  fetchData(): Subject<Media[]> {
    const subject = new Subject<Media[]>();

    this.http.get<Media>(`${this.url}`)
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
        this.mediaData = data;
        subject.next(data);
      });

    return subject;
  }
}