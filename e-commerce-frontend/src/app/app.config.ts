import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./routing/routes";
import { HttpClientModule } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { registerLocaleData } from "@angular/common";
import localeRu from '@angular/common/locales/fr';
import { MatDialogContent, MatDialogModule } from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

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
        importProvidersFrom(MatDialogModule),
        importProvidersFrom(MatDialogContent),
        importProvidersFrom(MatSelectModule),
        importProvidersFrom(MatAutocompleteModule),
        provideAnimations()
    ]
}