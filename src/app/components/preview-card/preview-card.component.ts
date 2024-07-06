import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input('cardData') cardData: any;

  bookmark: boolean;
  bookmarkData: Media[] = []
  nameClicked: string = '';
  objectRelation: Media;
  

  constructor(
    private mediaService: MediaService,
    private router: Router) {}

  ngOnInit() {
    const subject = this.mediaService.fetchData()
    this.bookmark = this.cardData.isBookmarked;
    
    subject.subscribe(data => {
      this.bookmarkData = data
    })
  }  
}











































/*

ngOnInit() {
    const subject = this.mediaService.fetchData()
    this.bookmark = this.cardData.isBookmarked;
    
    subject.subscribe(data => {
      this.bookmarkData = data
    })
  }

  patchNewBookmarkValue(): void {
    const id = this.objectRelation.id;
    const body = {
      ...this.objectRelation,
      isBookmarked: !this.objectRelation.isBookmarked
    };

    // send a patch request to  firebase
    this.http.patch(`${this.url}${id}${this.jsonExt}`, body)
      .subscribe(res => {
        this.cardData = res
        // re-init the page with new data

    });
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

  second try 

   patchNewBookmarkValue(): void {
    const id = this.objectRelation.id;
    if(this.nameClicked) {

      this.mediaService.patchNewBookmarkValue(this.objectRelation, id)
      .subscribe(data => {
        this.objectRelationEvent.emit(data);        
      })
    } else {
      console.log('error was found in previewcard component ts file')
      return null
    }

  }

*/ 