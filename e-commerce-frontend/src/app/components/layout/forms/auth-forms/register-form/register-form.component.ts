import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SiteConfigState } from 'src/app/services/siteConfigState/app.siteConfigState';
import { IAccount } from 'src/app/models/account.model';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['../auth-forms-styles.scss']
})
export class RegisterFormComponent {

  @Output() formEntered: EventEmitter<void> = new EventEmitter<void>();

  public hiddenPassword: boolean = true;
  public hiddenPasswordConfirm: boolean = true;
  public registerForm!: FormGroup;
  public duplicateLogin: string = '';
  public duplicateEmail: string = '';

  constructor(
    private authService: AuthService,
    private authState: AuthState,
    private alertService: AlertService,
    private siteConfigState: SiteConfigState) {
      this.registerForm = this.initRegisterForm();
  }

  private initRegisterForm(): FormGroup {
    const form = new FormGroup({
      registerLogin: new FormControl(
        "",
        [Validators.required,
        Validators.minLength(this.siteConfigState.MIN_LENGHT_LOGIN),
        Validators.maxLength(this.siteConfigState.MAX_LENGHT_LOGIN)]),
      registerName: new FormControl(
        "",
        [Validators.required]
      ),
      registerEmail: new FormControl(
        "",
        [Validators.required,
        Validators.email]
      ),
      registerPassword: new FormControl(
        "",
        [Validators.required,
        Validators.pattern(this.siteConfigState.REGEXP)],
      ),
      registerPasswordConfirm: new FormControl(
        "",
        [Validators.required,
        Validators.pattern(this.siteConfigState.REGEXP)],
      )
    });
    form.setValidators(this.passwordMatchValidator('registerPassword', 'registerPasswordConfirm'))
    return form;
  }

  public submitRegisterForm(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      const account: IAccount = {
        login: formValue.registerLogin,
        name: formValue.registerName,
        email: formValue.registerEmail,
        password: formValue.registerPassword,
        adress: {
          city: "",
          street: "",
          house: ""
        }
      }
      this.authService.register(account).subscribe({
        next: (response: any) => {
          this.alertService.openSnackBar(response.message, 2000, "valid");
          this.registerForm.reset();
          this.formEntered.emit();
        },
        error: (error) => {
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
      });      
    }
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

  public get registerLogin(): AbstractControl | null {
    return this.registerForm.get("registerLogin");
  }

  public get registerName(): AbstractControl | null {
    return this.registerForm.get("registerName");
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
