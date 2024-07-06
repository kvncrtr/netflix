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
  idClicked: string = '';
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

  getElementName(event: Event) {
    return this.idClicked = event.target["id"];
  }
}