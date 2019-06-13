import { Component, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {

  details:any = {
    title: ''
  };

  constructor(public dialogRef: MatDialogRef<AddDialogComponent>) { }

  onCancel() {
    this.dialogRef.close();
  }

}