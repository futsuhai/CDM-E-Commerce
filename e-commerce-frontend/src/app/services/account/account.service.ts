import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { IAccount } from 'src/app/models/account.model';
import { Observable } from 'rxjs';
import { IAccountData } from 'src/app/models/accountData.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  get api(): string {
    return `/api/accounts`;
  }

  constructor(private restService: RestService) { }

  public update(account: IAccount): Observable<IAccount> {
    const endpoint: string = `${this.api}/UpdateAccount`;
    return this.restService.restPUT<IAccount>(endpoint, account);
  }

  public updateAccountData(accountData: IAccountData, accountId: string): Observable<IAccountData> {
    const endpoint: string = `${this.api}/UpdateAccountData/${accountId}`;
    return this.restService.restPUT<IAccountData>(endpoint, accountData);
  }
}
