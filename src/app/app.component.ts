import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AppService } from './app.service';

import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private dialog: MatDialog,
    public appService: AppService) {}

  onAddBoard() {
    const listId = this.appService.data.length + 1;
    this.openDialog(AddDialogComponent, listId);
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
      const boardObj = {
        "boardName": title,
        "boardId": listId,
        "boardList": []
      };

      this.appService.data.push(boardObj);
    });
  }

}
