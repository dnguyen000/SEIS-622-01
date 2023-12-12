import {Component, EventEmitter, Output} from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html',
  styleUrls: ['./dialog-popup.component.scss']
})
export class DialogPopupComponent {
  constructor(public dialogRef: MatDialogRef<DialogPopupComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  public message: string;
  public wasSuccessful: string;
}
