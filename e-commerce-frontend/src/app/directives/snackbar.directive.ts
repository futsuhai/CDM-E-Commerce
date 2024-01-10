import { Directive, HostListener } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Directive({
    selector: '[appSnackBar]',
    standalone: true
})
export class SnackBarDirective {

    horizontalPosition: MatSnackBarHorizontalPosition = "center";
    verticalPosition: MatSnackBarVerticalPosition = "bottom";

    constructor(private snackBar: MatSnackBar) { }

    @HostListener('click') onClick() {
        this.openSnackBar();
    }

    public openSnackBar() {
        console.log("snackbar");
        this.snackBar.open("Message", "Close", {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: 1000
        });
    }
}