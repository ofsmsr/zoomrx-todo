import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { AppService } from '../app.service';

import { AddDialogComponent } from '../add-dialog/add-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  @Input('boardDetails') boardDetails;
  @Input('boardIndex') boardIndex;

  constructor(private dialog: MatDialog,
    private appService: AppService) { }

  onAddList() {
    if (this.appService.isValidObj([this.boardIndex, ['boardList']], this.appService.data)) {
      const listId = this.appService.data[this.boardIndex].boardList.length + 1;
      this.openDialog(AddDialogComponent, listId);
    }
  }

  openDialog(dialogComp, listId) {
    const dialogRef = this.dialog.open(dialogComp, {
      width: '30%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((title) => {
      if (!title) {
        return;
      }
      const listObj = {
        "listName": title,
        "listId": listId,
        "listCards": []
      };

      if (this.appService.isValidObj([this.boardIndex, ['boardList']], this.appService.data)) {
        this.appService.data[this.boardIndex].boardList.push(listObj);
      }
    });
  }
  
  onDeleteBoard() {
    if (this.appService.isValidObj([this.boardIndex], this.appService.data)) {
      this.appService.data.splice(this.boardIndex, 1);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boardDetails.boardList, event.previousIndex, event.currentIndex);
  }

}
