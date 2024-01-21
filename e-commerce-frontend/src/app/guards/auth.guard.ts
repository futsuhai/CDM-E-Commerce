import { inject } from "@angular/core";
import { AuthState } from "../services/auth/auth-state.module";
import { Router } from "@angular/router";

export const authGuard = () => {
    const authState = inject(AuthState);
    const router = inject(Router);
    if (authState.isAuth()) {
        return true;
    }
    return router.parseUrl('/auth');
};