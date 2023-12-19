import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { AuthService } from 'src/app/services/auth/auth.service';

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
  public hiddenPassword: boolean = true;
  public hiddenPasswordConfirm: boolean = true;
  public registerForm!: FormGroup;
  public duplicateLogin: string = '';
  public duplicateEmail: string = '';
  public authForm!: FormGroup;

  private readonly REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  private readonly MIN_LENGHT_LOGIN = 4;
  private readonly MAX_LENGHT_LOGIN = 12;

  constructor(
    private authService: AuthService,
    private authState: AuthState,
    private router: Router) {
      this.registerForm = this.initRegisterForm();
      this.authForm = this.initAuthForm();
  }

  private initAuthForm(): FormGroup {
    return new FormGroup({
      authLogin: new FormControl(
        "",
        [Validators.required,
        Validators.minLength(this.MIN_LENGHT_LOGIN),
        Validators.maxLength(this.MAX_LENGHT_LOGIN)]),
      authPassword: new FormControl(
        "",
        [Validators.required,
        Validators.pattern(this.REGEXP)],
      )
    });
  }

  private initRegisterForm(): FormGroup {
    const form = new FormGroup({
      registerLogin: new FormControl(
        "",
        [Validators.required,
        Validators.minLength(this.MIN_LENGHT_LOGIN),
        Validators.maxLength(this.MAX_LENGHT_LOGIN)]),
      registerEmail: new FormControl(
        "",
        [Validators.required,
        Validators.email]
      ),
      registerPassword: new FormControl(
        "",
        [Validators.required,
        Validators.pattern(this.REGEXP)],
      ),
      registerPasswordConfirm: new FormControl(
        "",
        [Validators.required,
        Validators.pattern(this.REGEXP)],
      )
    });
    form.setValidators(this.passwordMatchValidator('registerPassword', 'registerPasswordConfirm'))
    return form;
  }

  submitAuthForm(): void {
    if(this.authForm.valid) {
      const formValue = this.authForm.value;
      const account: IAccount = {
        login: formValue.authLogin,
        password: formValue.authPassword
      }
      this.authService.login(account).pipe(take(1)).subscribe(
        (account) => {
          this.authState.setCurrentUser(account);
          this.router.navigate(['/home']);
        },
        () => {
          this.authLogin?.setErrors({ unauthorized: true });
          this.authPassword?.setErrors({ unauthorized: true });
        }
      );
      // create modal "successful auth" and navigate on homePage *material
    }
  }

  submitRegisterForm(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const account: IAccount = {
        login: formValue.registerLogin,
        email: formValue.registerEmail,
        password: formValue.registerPassword
      }
      this.authService.register(account).pipe(take(1)).subscribe(
        (response) => {
          console.log(response)
          this.registerForm.reset();
          // create modal "successful registration" and push response.message *material
        },
        (error) => {
          // pipe? НУЖНО УПРОСТИТЬ!!!
          if (error.error.detail) {
            if (error.error.detail.loginError) {
              this.registerLogin?.setErrors({ duplicateLogin: true });
              this.duplicateLogin = error.error.detail.loginError;
            }
            if (error.error.detail.emailError) {
              this.registerEmail?.setErrors({ duplicateEmail: true });
              this.duplicateEmail = error.error.detail.emailError;
            }
          }
        }
      );
    }
  }

  public switchForm(): void {
    this.active = !this.active;
    this.hiddenPassword = true;
    this.hiddenPasswordConfirm = true;
  }

  public hidePassword(id: string): void {
    const password = document.getElementById(id) as HTMLInputElement;
    password.type = password.type === "password" ? "text" : "password";
    id === "password" ? this.hiddenPassword = !this.hiddenPassword : this.hiddenPasswordConfirm = !this.hiddenPasswordConfirm;
  }

  private passwordMatchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (control && matchingControl && control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        if (matchingControl) {
          matchingControl.setErrors(null);
        }
        return null;
      }
    };
  }

  public get authLogin(): AbstractControl | null {
    return this.authForm.get("authLogin");
  }

  public get authPassword(): AbstractControl | null {
    return this.authForm.get("authPassword");
  }

  public get registerLogin(): AbstractControl | null {
    return this.registerForm.get("registerLogin");
  }

  public get registerEmail(): AbstractControl | null {
    return this.registerForm.get("registerEmail");
  }

  public get registerPassword(): AbstractControl | null {
    return this.registerForm.get("registerPassword");
  }

  public get registerPasswordConfirm(): AbstractControl | null {
    return this.registerForm.get("registerPasswordConfirm");
  }
}
