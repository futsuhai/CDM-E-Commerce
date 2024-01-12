import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private horizontalPosition: MatSnackBarHorizontalPosition = "right";
  private verticalPosition: MatSnackBarVerticalPosition = "bottom";
  private className: string = 'mat-mdc-snack-bar-container__';

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(message: string, duration: number, state: string) {
    this.snackBar.open(message, "", {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration,
      panelClass: this.className + state
    });
  }
}
