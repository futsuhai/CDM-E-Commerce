import { Injectable } from "@angular/core";
import { BehaviorSubject, switchMap } from "rxjs";
import { IAccount } from "src/app/models/account.model";
import { IImage } from "src/app/models/image.model";
import { ImageService } from "../image/image.service";
import { IBasketProduct } from "src/app/models/basketProduct.model";
import { AccountService } from "../account/account.service";
import { AlertService } from "../alert/alert.service";
import { IProduct } from "src/app/models/product.model";

@Injectable({
    providedIn: 'root'
})
export class AuthState {

    public currentAccount = new BehaviorSubject<IAccount | null>(null);
    public currentAvatar = new BehaviorSubject<string | null>(null);

    constructor(
        private imageService: ImageService,
        private accountService: AccountService,
        private alertService: AlertService) {
    const storedAccount = localStorage.getItem('currentAccount');
    this.currentAccount = new BehaviorSubject<IAccount | null>(storedAccount ? JSON.parse(storedAccount) : null);
    }

    public setCurrentUser(user: IAccount): void {
        this.currentAccount.next(user);
        if (user.avatar) {
            this.imageService.getImage(user.avatar).pipe(
                switchMap((avatarImage: IImage | undefined) => {
                    if (avatarImage) {
                        this.currentAvatar.next(avatarImage.img64);
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
        this.currentAvatar.next(null);
    }

    public likeProduct(isLiked: boolean, product: IProduct): boolean {
        if (this.currentAccount.value) {
            if (!isLiked) {
                if (this.currentAccount.value.accountDataModel) {
                    this.currentAccount.value.accountDataModel.liked.push(product);
                }
            } else {
                if (this.currentAccount.value.accountDataModel) {
                    this.currentAccount.value.accountDataModel.liked = this.currentAccount.value.accountDataModel.liked.filter(
                        (likedProduct) => likedProduct.id !== product.id
                    );
                }
            }
            this.accountService.update(this.currentAccount.value).subscribe({
                next: (account) => {
                    this.setCurrentUser(account);
                }
            });
        }
        return !isLiked;
    }
    

    public addToBasket(productBasket: IBasketProduct): void {
        if (this.currentAccount.value) {
            this.currentAccount.value?.accountDataModel?.basket.push(productBasket);
            this.accountService.update(this.currentAccount.value).subscribe({
                next: (account) => {
                    this.setCurrentUser(account);
                    this.alertService.openSnackBar("Товар добавлен в корзину", 2000, "valid");
                }
            });
        }
    }
}