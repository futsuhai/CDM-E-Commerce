import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, switchMap } from "rxjs";
import { IAccount } from "src/app/models/account.model";
import { IImage } from "src/app/models/image.model";
import { ImageService } from "../image/image.service";

@Injectable({
    providedIn: 'root'
})
export class AuthState {

    public currentAccount = new BehaviorSubject<IAccount | null>(null);
    public currentAvatar = new BehaviorSubject<string | null>(null);

    constructor(private imageService: ImageService) { }

    public setCurrentUser(user: IAccount): void {
        this.currentAccount.next(user);
    
        if (user.avatar) {
            this.imageService.getImage(user.avatar).pipe(
                switchMap((avatarImage: IImage | undefined) => {
                    if (avatarImage) {
                        this.currentAvatar.next(avatarImage.img);
                    } else {
                        console.error('Avatar image not found.');
                        this.currentAvatar.next(null);
                    }
                    return [];
                })).subscribe();
        } else {
            this.currentAvatar.next(null);
        }
    
        localStorage.setItem('currentAccount', JSON.stringify(user));
    
        if (user.tokens && user.tokens.refreshToken) {
            localStorage.setItem('refreshToken', user.tokens.refreshToken);
        }
    }

    public getCurrentUser(): IAccount {
        const storedAccount = localStorage.getItem('currentAccount');
        return storedAccount ? JSON.parse(storedAccount) : null;
    }

    public isAuth(): boolean {
        return !!this.currentAccount.value;
    }

    public logout(): void {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentAccount');
        this.currentAccount.next(null);
    }
}