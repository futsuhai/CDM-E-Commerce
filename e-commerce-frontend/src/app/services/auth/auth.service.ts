import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get api(): string {
    return `/api/auth`;
  }

  constructor(private restService: RestService) { }

  public register(account: IAccount): Observable<IAccount> {
    const endpoint: string = `${this.api}/Register`;
    return this.restService.restPOST<IAccount>(endpoint, account);
  }

  public login(account: IAccount): Observable<IAccount> {
    const endpoint: string = `${this.api}/Auth`;
    return this.restService.restPUT<IAccount>(endpoint, account);
  }

  public refreshTokens(refreshToken: string): Observable<IAccount> {
    const endpoint: string = `${this.api}/RefreshTokens/${refreshToken}`;
    return this.restService.restPUT<IAccount>(endpoint);
  }
}
