import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';

import { AppComponent } from './app.component';

import { registerLocaleData } from "@angular/common";
import localeSv from "@angular/common/locales/sv";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "sv-SE" }],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeSv, "sv");