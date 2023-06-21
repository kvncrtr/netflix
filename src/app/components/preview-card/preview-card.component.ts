import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent implements OnInit {
  @Input('cardData') cardData: any;
  bookmark: boolean | undefined;

  ngOnInit() {
    this.bookmark = this.cardData.isBookmarked;
    console.log(this.bookmark);
  }
}