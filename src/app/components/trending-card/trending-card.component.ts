import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trending-card',
  templateUrl: './trending-card.component.html',
  styleUrls: ['./trending-card.component.css']
})
export class TrendingCardComponent {
  @Input('cardData') cardData: any;
  trend: boolean = false;
}
