import { inject } from "@angular/core";
import { AuthState } from "../services/auth/auth-state.module";
import { Router } from "@angular/router";
import { Role } from "../models/account.model";

export const adminGuard = () => {
    const authState = inject(AuthState);
    const router = inject(Router);
    const role = authState.currentAccount.value?.role;
    if(role === Role.admin){
        return true;
    }
    return router.parseUrl('/');
};