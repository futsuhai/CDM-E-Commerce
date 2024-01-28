import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IAccount, Role } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { BannerComponent } from '../../layout/banner/banner.component';
import { Router, RouterLink } from '@angular/router';
import { PhoneNumberDirective } from 'src/app/directives/phone.directive';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { take } from 'rxjs';
import { ImageService } from 'src/app/services/image/image.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { IImage } from 'src/app/models/image.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BannerComponent, PhoneNumberDirective, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    class: 'profile'
  }
})
export class ProfileComponent {

  public currentAccount!: IAccount | null;
  public profileForm!: FormGroup;
  public avatar: string = "";
  public currentAvatar: string = "";
  public role: Role = Role.admin;

  constructor(private authState: AuthState,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService,
    private imageService: ImageService) {
    this.currentAccount = authState.getCurrentUser();
    if (this.currentAccount && this.currentAccount.avatar) {
      this.authState.currentAvatar.subscribe(
        (avatar) => {
          if (avatar) {
            this.avatar = avatar;
            this.currentAvatar = avatar;
          }
        });
      this.profileForm = this.initProfileForm();
    }
  }

  private initProfileForm(): FormGroup {
    return new FormGroup({
      profileFamily: new FormControl(this.currentAccount?.family),
      profileName: new FormControl(this.currentAccount?.name),
      profileSurname: new FormControl(this.currentAccount?.surname),
      profileDate: new FormControl(this.formatDate(this.currentAccount?.date)),
      profileEmail: new FormControl(this.currentAccount?.email, [Validators.required, Validators.email]),
      profilePhone: new FormControl(this.currentAccount?.phone),
      profileCity: new FormControl(this.currentAccount?.adress?.city),
      profileStreet: new FormControl(this.currentAccount?.adress?.street),
      profileHouse: new FormControl(this.currentAccount?.adress?.house),
    })
  }

  public submitProfileForm(): void {
    if (this.profileForm.valid) {
      const formValue = this.profileForm.value;
      const account: IAccount = {
        id: this.currentAccount?.id,
        login: this.currentAccount?.login,
        family: formValue.profileFamily,
        name: formValue.profileName,
        surname: formValue.profileSurname,
        date: formValue.profileDate,
        email: formValue.profileEmail,
        phone: formValue.profilePhone,
        adress: {
          city: formValue.profileCity,
          street: formValue.profileStreet,
          house: formValue.profileHouse,
        },
        avatar: this.currentAccount?.avatar,
        accountDataModel: this.currentAccount?.accountDataModel,
        role: this.currentAccount?.role
      }
      console.log(account);
      this.accountService.update(account).subscribe({
        next: account => {
          this.authState.setCurrentUser(account);
          this.alertService.openSnackBar("Данные успешно сохранены", 2000, "valid");
        },
        error: () => {
          this.alertService.openSnackBar("Ошибка при сохранении данных", 2000, "invalid");
        }
      });
    }
  }

  public changeAvatar(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.imageService.convertFileToBase64(file).pipe(take(1)).subscribe({
        next: (base64String) => {
          this.avatar = base64String;
          if (this.avatar !== this.currentAvatar) {
            this.imageService.convertImageToByteArray(this.avatar).subscribe({
              next: (uint8Array) => {
                this.imageService.addImage(uint8Array).subscribe({
                  next: (image: IImage) => {
                    if (this.currentAccount?.avatar) {
                      this.currentAccount.avatar = image.id;
                      this.alertService.openSnackBar("Файл успешно загружен", 2000, "valid");
                    }
                  },
                  error: () => {
                    this.alertService.openSnackBar("Ошибка при загрузке файла", 2000, "invalid");
                  }
                });
              },
              error: () => {
                this.alertService.openSnackBar("Ошибка при загрузке файла", 2000, "invalid");
              }
            });
          } else {
            if (this.currentAccount?.avatar) {
              this.currentAvatar = this.currentAccount.avatar;
            }
          }
        },
        error: () => {
          this.alertService.openSnackBar("Ошибка при загрузке файла", 2000, "invalid");
        }
      });
    }
  }

  public logout(): void {
    this.authState.logout();
    this.router.navigate(['/auth'])
  }

  private formatDate(date: Date | undefined): string | null {
    return date ? new Date(date).toISOString().split('T')[0] : null;
  }

  public get profileFamily(): AbstractControl | null {
    return this.profileForm.get("profileFamily");
  }

  public get profileName(): AbstractControl | null {
    return this.profileForm.get("profileName");
  }

  public get profileSurname(): AbstractControl | null {
    return this.profileForm.get("profileSurname");
  }

  public get profileDate(): AbstractControl | null {
    return this.profileForm.get("profileDate");
  }

  public get profileEmail(): AbstractControl | null {
    return this.profileForm.get("profileEmail");
  }

  public get profilePhone(): AbstractControl | null {
    return this.profileForm.get("profilePhone");
  }

  public get profileCity(): AbstractControl | null {
    return this.profileForm.get("profileCity");
  }

  public get profileStreet(): AbstractControl | null {
    return this.profileForm.get("profileStreet");
  }

  public get profileHouse(): AbstractControl | null {
    return this.profileForm.get("profileHouse");
  }
}
