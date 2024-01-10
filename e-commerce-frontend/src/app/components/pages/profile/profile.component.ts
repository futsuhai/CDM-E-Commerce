import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IAccount } from 'src/app/models/account.model';
import { AuthState } from 'src/app/services/auth/auth-state.module';
import { BannerComponent } from '../../layout/banner/banner.component';
import { Router } from '@angular/router';
import { PhoneNumberDirective } from 'src/app/directives/phone.directive';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account/account.service';
import { take } from 'rxjs';
import { ImageService } from 'src/app/services/image/image.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, BannerComponent, PhoneNumberDirective, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    class: 'profile'
  }
})
export class ProfileComponent {

  public currentAccount!: IAccount | null;
  public profileForm!: FormGroup;
  public uploadedAvatar: string = "";
  public change: boolean = false;

  constructor(private authState: AuthState, private router: Router, private accountService: AccountService, private imageService: ImageService) {
    this.currentAccount = authState.getCurrentUser();
    if (this.currentAccount && this.currentAccount.avatar) {
      this.uploadedAvatar = this.currentAccount.avatar;
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
        avatar: this.uploadedAvatar,
      }
      this.accountService.update(account).pipe(take(1)).subscribe(
        account => {
          this.authState.setCurrentUser(account);
          //snackbar
        })
    }
  }

  public changeAvatar(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.imageService.convertFileToBase64(file).pipe(take(1)).subscribe(
        (base64String) => {
          this.uploadedAvatar = base64String;
          this.change = !this.change;
        },
        (error) => {
          console.error(error);
          // snackbar
        }
      );
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
