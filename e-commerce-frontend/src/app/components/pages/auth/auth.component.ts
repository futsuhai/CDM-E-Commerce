import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QualityComponent } from '../../layout/quality/quality.component';
import { AboutCompanyComponent } from '../../layout/about-company/about-company.component';
import { LoginFormComponent } from '../../layout/forms/auth-forms/login-form/login-form.component';
import { RegisterFormComponent } from '../../layout/forms/auth-forms/register-form/register-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, QualityComponent, AboutCompanyComponent, LoginFormComponent, RegisterFormComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  host: {
    class: 'auth'
  }
})

export class AuthComponent {

  public active: boolean = false;

  public switchForm(): void {
    this.active = !this.active;
  }
}
