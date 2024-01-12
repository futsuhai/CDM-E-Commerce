import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./routing/routes";
import { HttpClientModule } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(APP_ROUTES),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(MatSnackBarModule),
        provideAnimations()
    ]
}