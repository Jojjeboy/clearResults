import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from "@angular/common";
import localeSv from "@angular/common/locales/sv";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: "sv-SE" }],
  bootstrap: [AppComponent]
})
export class AppModule { }

registerLocaleData(localeSv, "sv");