import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { IConfig } from 'ngx-mask';
import { provideEnvironmentNgxMask } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideEnvironmentNgxMask(maskConfig),
  ],
})
.catch((err) => console.error(err));