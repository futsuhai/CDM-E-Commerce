import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./routing/routes";
import { HttpClientModule } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { registerLocaleData } from "@angular/common";
import localeRu from '@angular/common/locales/fr';

registerLocaleData(localeRu, 'ru');

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'ru'
        },
        provideRouter(APP_ROUTES),
        importProvidersFrom(HttpClientModule),
        importProvidersFrom(MatSnackBarModule),
        provideAnimations()
    ]
}