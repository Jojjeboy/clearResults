import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TimeagoModule } from 'ngx-timeago';
import { ClarityModule } from '@clr/angular';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [],
  imports: [
    TimeagoModule.forRoot(),
    ClarityModule
  ],
  exports:[
    CommonModule,
    TimeagoModule,
    ClarityModule,
    BrowserModule,
    HttpClientModule
  ]
})
export class SharedModule { }