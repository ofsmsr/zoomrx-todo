import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { data } from './data.js';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  data: any = data;

  constructor(private dialog: MatDialog){}
  
  addCard(dialogComp, boardIndex, listIndex) {
    const _details = {
      _boardIndex: boardIndex,
      _listIndex: listIndex
    };
    this.openDialog(dialogComp, _details);
  }

  editCard(dialogComp, params) {
    this.openDialog(dialogComp, params);
  }

  openDialog(dialogComp, details) {
    this.dialog.open(dialogComp, {
      width: '55%',
      data: details,
      disableClose: true
    });
  }

  isValidObj(arr, data): boolean {
    let obj = data;
    for (const ele of arr) {
      if (Array.isArray(ele)) {
        this.isValidObj(ele, obj);
      } else {
        obj = obj[ele];
      }
      if (!obj) {
        break;
      }
    }
    return obj ? true : false;
  }
}
