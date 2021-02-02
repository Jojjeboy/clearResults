import { DecimalPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {

  constructor() {}

  formatDate(date: Date): string {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }


  getDayOffset(numberOfDaysOffset: number, direction: number): Date {
    let offsetDate: Date = new Date();
    if (direction === 0) {
      offsetDate = (d =>
        new Date(d.setDate(d.getDate() - numberOfDaysOffset))
      )(new Date);
    }
    else {
      offsetDate = (d =>
        new Date(d.setDate(d.getDate() + numberOfDaysOffset))
      )(new Date);
    }
    return offsetDate;
  }


  lastTouchedIsOld(lastTouched: Date, resetInterval: string): boolean {

    if(resetInterval === 'daily'){
      if (new Date().setHours(0, 0, 0, 0) - lastTouched.setHours(0, 0, 0, 0) > 0) {
        return true;
      }
      
      return false;
    }
    return false;
  }

  fixDateBeforeSaving(lastTouched: Date): Date {
    let hoursDiff = lastTouched.getHours() - lastTouched.getTimezoneOffset() / 60;
    let minutesDiff = (lastTouched.getHours() - lastTouched.getTimezoneOffset()) % 60;
    lastTouched.setHours(hoursDiff);
    lastTouched.setMinutes(minutesDiff);

    return lastTouched;
  }

}
