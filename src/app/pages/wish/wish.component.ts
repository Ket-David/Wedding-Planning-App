import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Wish } from 'src/app/app.model';

@Component({
  selector: 'app-apps',
  templateUrl: './wish.component.html'
})
export class WishComponent {

  constructor(
    public dialogRef: MatDialogRef<WishComponent>,
    public readonly snakebar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Wish) { }

  onSend(): void {
    this.snakebar.open('Wish Successfully!');
    this.dialogRef.close(true); 
  }

  getUrl(): string {
    return `url(${this.data.photo})`;
  }
}
