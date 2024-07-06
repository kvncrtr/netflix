import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-trending-card',
  templateUrl: './trending-card.component.html',
  styleUrls: ['./trending-card.component.css']
})
export class TrendingCardComponent implements OnInit {
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

  associateElementsObject():void {
    const associatedObject = this.bookmarkData.find(media => media.title === this.nameClicked)
    const id = associatedObject.id;
    const body = {
      ...associatedObject,
      isBookmarked: !associatedObject.isBookmarked
    }
    this.objectRelation = associatedObject;
  }

  getElementName(event: any) {
    this.nameClicked = event.target.attributes.name.value
    this.associateElementsObject()
  }
}
