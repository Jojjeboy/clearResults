import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {

  constructor() { }


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
}
