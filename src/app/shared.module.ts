import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    BrowserModule
  ]
})
export class SharedModule { }