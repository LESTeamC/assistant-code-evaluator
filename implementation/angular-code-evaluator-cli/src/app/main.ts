import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AuthService } from './shared/auth.service';


import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
