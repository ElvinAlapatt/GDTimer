import { inject } from '@vercel/analytics';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; 

inject();

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
