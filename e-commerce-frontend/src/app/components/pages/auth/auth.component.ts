import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  host: {
    class: 'auth'
  }
})
export class AuthComponent {

  public active: boolean = false;
  public hidden: boolean = true;

  public switchForm(): void {
    this.active = !this.active;
    this.hidden = true;
  }

  public hidePassword(id: string): void {
    const password = document.getElementById(id) as HTMLInputElement;
    password.type = password.type === "password" ? "text" : "password";
    this.hidden = !this.hidden;
  }
}
