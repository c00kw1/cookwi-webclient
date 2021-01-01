import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrls: ['./simple-dialog.component.css'],
})
export class SimpleDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SimpleDialogData
  ) {
    if (!data.cancelButton || data.cancelButton === null) {
      data.cancelButton = 'Annuler';
    }
  }

  ngOnInit(): void {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}

export interface SimpleDialogData {
  title: string;
  message: string;
  cancelButton?: string;
  cancelButtonIcon?: string;
  validateButton?: string;
  validateButtonIcon?: string;
}
