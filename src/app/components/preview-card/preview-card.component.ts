import { Component, Input, OnInit } from '@angular/core';

import { BookmarkService } from 'src/app/services/bookmark.service';
import { Media } from 'src/app/interfaces/media.interface';
import { MediaService } from 'src/app/services/media.service';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input('cardData') cardData: any;
  bookmark: boolean = false;
  bookmarkData: Media[] = []
  nameClicked: string = '';
  objectRelation: Media;

  constructor(
    private bookmarkService: BookmarkService,
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
    
  }

  associateElementsObject():void {
    const associatedObject = this.bookmarkData.find(media => media.title === this.nameClicked)
    this.objectRelation = associatedObject;
  }

  getElementName(event: any) {
    this.nameClicked = event.target.attributes.name.value
    this.associateElementsObject()
  }


}