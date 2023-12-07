import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppConfig {
    private baseUrl = 'http://localhost:5159';

    public get productsApi(): string {
        return `${this.baseUrl}/api/products`;
    }

    public get authApi(): string {
        return `${this.baseUrl}/api/auth`;
    }

    public get accountsApi(): string {
        return `${this.baseUrl}/api/accounts`;
    }
}