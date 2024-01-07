import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IAccount } from "src/app/models/account.model";

@Injectable({
    providedIn: 'root'
})
export class AuthState {

    public currentAccount = new BehaviorSubject<IAccount | null>(null);
    public currentAccountMock = new BehaviorSubject<IAccount>({
        id: '1',
        login: 'MockUser',
        email: 'mock@mail.ru'
    })

    public setCurrentUser(user: IAccount): void {
        this.currentAccount.next(user);
    }

    public logout(): void {
        this.currentAccount.next(null);
    }
}