import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IAccount } from "src/app/models/account.model";

@Injectable({
    providedIn: 'root'
})
export class AuthState {

    public currentAccount = new BehaviorSubject<IAccount | null>(null);

    public setCurrentUser(user: IAccount): void {
        this.currentAccount.next(user);
        localStorage.setItem('currentAccount', JSON.stringify(user));
        if (user.tokens && user.tokens.refreshToken) {
            localStorage.setItem('refreshToken', user.tokens.refreshToken);
        }
    }

    public getCurrentUser(): IAccount {
        const storedAccount = localStorage.getItem('currentAccount');
        return storedAccount ? JSON.parse(storedAccount) : null;
    }

    public logout(): void {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentAccount');
        this.currentAccount.next(null);
    }
}