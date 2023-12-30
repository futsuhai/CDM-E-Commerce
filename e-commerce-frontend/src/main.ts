import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app/routing/routes';

bootstrapApplication(AppComponent,
  {
    providers: [
      importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    ]
  })
  .catch((err) => console.error(err));
