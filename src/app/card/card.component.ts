import { Component, Input } from '@angular/core';

import { AppService } from '../app.service';

import { AddCardComponent } from '../add-card/add-card.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input('cardDetails') cardDetails;
  @Input('boardIndex') boardIndex;
  @Input('listIndex') listIndex;
  @Input('cardIndex') cardIndex;

  constructor(private appService: AppService) { }

  onEditCard() {
    const params = {
      _cardDetails: this.cardDetails,
      _boardIndex: this.boardIndex,
      _listIndex: this.listIndex,
      _cardIndex: this.cardIndex,
    };
    this.appService.editCard(AddCardComponent, params);
  }

}
