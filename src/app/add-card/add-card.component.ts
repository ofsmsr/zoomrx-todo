import { Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { AppService } from '../app.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {

  cardDetails:any = {
    cardTitle: '',
    cardDesc: '',
    cardComments: []
  };

  constructor(public dialogRef: MatDialogRef<AddCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private appService: AppService) { }

  ngOnInit() {
    const _details = this.data._cardDetails ? Object.assign({}, this.data._cardDetails) : null;
    this.cardDetails = _details || this.cardDetails;
  }

  isShowDelete(): boolean {
    return (typeof this.data._cardIndex !== 'undefined');
  }

  onDeleteCard() {
    if (this.appService.isValidObj([this.data._boardIndex, ['boardList', this.data._listIndex], ['listCards', this.data._cardIndex]], this.appService.data)) {
        this.appService.data[this.data._boardIndex].boardList[this.data._listIndex].listCards.splice(this.data._cardIndex, 1);
        this.onCancel();
      }
  }

  onAddComment() {
    if (this.appService.isValidObj(['cardComments'], this.cardDetails)) {
      this.cardDetails.cardComments.push({
        text: this.cardDetails.currentComment,
        date: new Date()
      });
      this.cardDetails.currentComment = '';
    }
  }

  onSubmit() {
    if (this.isShowDelete()) {
      if (this.appService.isValidObj([this.data._boardIndex, ['boardList', this.data._listIndex], ['listCards', this.data._cardIndex]], this.appService.data)) {
        this.appService.data[this.data._boardIndex].boardList[this.data._listIndex].listCards[this.data._cardIndex] = this.cardDetails;
      }
    } else {
      if (this.appService.isValidObj([this.data._boardIndex, ['boardList', this.data._listIndex], ['listCards']], this.appService.data)) {
        this.appService.data[this.data._boardIndex].boardList[this.data._listIndex].listCards.push(this.cardDetails);
      }
    }
    this.onCancel();
  }
  
  onCancel() {
    this.dialogRef.close();
  }

}
