import { Component, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { AppService } from '../app.service';

import { AddCardComponent } from '../add-card/add-card.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @Input('listDetails') listDetails;
  @Input('boardIndex') boardIndex;
  @Input('listIndex') listIndex;

  constructor(private appService: AppService) { }

  onAddCard() {
    this.appService.addCard(AddCardComponent, this.boardIndex, this.listIndex);
  }

  onDeleteList() {
    this.appService.data[this.boardIndex].boardList.splice(this.listIndex, 1);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listDetails.listCards, event.previousIndex, event.currentIndex);
  }

}
