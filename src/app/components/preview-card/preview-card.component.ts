import { Component, Input, OnInit } from '@angular/core';

import { BookmarkService } from 'src/app/services/bookmark.service';
import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input('cardData') cardData: any;
  bookmark: boolean = false;
  
  url: string = 'https://netflix-clone-fire-8079b-default-rtdb.firebaseio.com/';
  jsonExt: string = '.json';
  bookmarkData: Media[] = []
  nameClicked: string = '';
  objectRelation: Media;
  

  constructor(
    private bookmarkService: BookmarkService,
    private http: HttpClient,
    private mediaService: MediaService 
  ) {}

  ngOnInit() {
    const subject = this.mediaService.fetchData()
    this.bookmark = this.cardData.isBookmarked;
    
    subject.subscribe(data => {
      this.bookmarkData = data
    })
  }

  patchNewBookmarkValue(): void {
    const id = this.objectRelation.id
    const body  = {
      ...this.objectRelation,
      isBookmarked: !this.objectRelation.isBookmarked
    }

    // send a patch request to  firebase
    this.http.patch(`${this.url}${id}${this.jsonExt}`, body)
    .subscribe(res => {
      console.log(res)
    })
    
    // re init the page with new data
  }

  reloadComponent(): void {

  }

  associateElementsObject():void {
    const associatedObject = this.bookmarkData.find(media => media.title === this.nameClicked)
    this.objectRelation = associatedObject;
    this.patchNewBookmarkValue()
  }

  getElementName(event: any) {
    this.nameClicked = event.target.attributes.name.value
    this.associateElementsObject()
  }


}