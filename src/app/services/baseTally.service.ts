import { Injectable } from '@angular/core';
import { Tally } from '../classes/Tally';
import { DateHelperService } from './date/date-helper.service';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BaseTally {

  constructor(protected localStorageService: LocalStorageService, protected dateHelperService: DateHelperService) {}

  touch(tally: Tally): void {
    tally.setLastTouched(new Date());
  }

  save(tally: Tally): void {
    const fixedDate = this.dateHelperService.fixDateBeforeSaving(tally.getLastTouched());
    tally.setLastTouched(fixedDate);
    this.localStorageService.add(this.convertToLsTally(tally));
  }

  update(tally: Tally): void {
    const fixedDate:Date = this.dateHelperService.fixDateBeforeSaving(tally.getLastTouched());
    tally.setLastTouched(fixedDate);
    this.localStorageService.update(this.convertToLsTally(tally));
  }

  convertToLsTally(tally: Tally): Object {
    const plainObject: Object = Object.assign({}, tally);
    return plainObject;
  }
}
