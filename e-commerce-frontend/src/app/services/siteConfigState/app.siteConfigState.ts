import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class SiteConfigState{

    public maxItemsInBucket: number = 10;
    public REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    public MIN_LENGHT_LOGIN = 4;
    public MAX_LENGHT_LOGIN = 12;
}