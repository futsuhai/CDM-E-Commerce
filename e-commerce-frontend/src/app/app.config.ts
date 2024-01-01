import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { APP_ROUTES } from "./routing/routes";
import { HttpClientModule } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(APP_ROUTES), HttpClientModule]
}