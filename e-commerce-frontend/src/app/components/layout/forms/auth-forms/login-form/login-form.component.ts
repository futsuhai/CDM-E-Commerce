import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { IAccount } from 'src/app/models/account.model';
import { SiteConfigState } from 'src/app/services/siteConfigState/app.siteConfigState';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['../auth-forms-styles.scss']
})
export class LoginFormComponent {

  public hiddenPasswordConfirm: boolean = true;
  public hiddenPassword: boolean = true;
  public authForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private authState: AuthState,
    private router: Router,
    private siteConfigState: SiteConfigState) {
      this.authForm = this.initAuthForm();
  }

  private initAuthForm(): FormGroup {
    return new FormGroup({
      authLogin: new FormControl<string | null>(
        "",
        [Validators.required,
        Validators.minLength(this.siteConfigState.MIN_LENGHT_LOGIN),
        Validators.maxLength(this.siteConfigState.MAX_LENGHT_LOGIN)]),
      authPassword: new FormControl<string | null>(
        "",
        [Validators.required,
        Validators.pattern(this.siteConfigState.REGEXP)],
      )
    });
  }

  public submitAuthForm(): void {
    if(this.authForm.valid) {
      const formValue = this.authForm.value;
      const account: IAccount = {
        login: formValue.authLogin,
        password: formValue.authPassword
      }
      this.authService.login(account).subscribe({
        next: (loggedInAccount) => {
          this.authState.setCurrentUser(loggedInAccount);
          this.router.navigate(['/home']);
        },
        error: () => {
          this.authLogin?.setErrors({ unauthorized: true });
          this.authPassword?.setErrors({ unauthorized: true });
        }
      });
    }
  }

  public get authLogin(): AbstractControl | null {
    return this.authForm.get("authLogin");
  }

  public get authPassword(): AbstractControl | null {
    return this.authForm.get("authPassword");
  }

  public hidePassword(id: string): void {
    const password = document.getElementById(id) as HTMLInputElement;
    password.type = password.type === "password" ? "text" : "password";
    id === "password" ? this.hiddenPassword = !this.hiddenPassword : this.hiddenPasswordConfirm = !this.hiddenPasswordConfirm;
  }
}
