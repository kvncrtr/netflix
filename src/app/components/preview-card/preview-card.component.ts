import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-card',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.css']
})
export class PreviewCardComponent {
  @Input('cardData') cardData: any;

  ngOnInit() {
    console.log(this.cardData)
  }
}
