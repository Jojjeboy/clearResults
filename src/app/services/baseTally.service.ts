import { Injectable } from '@angular/core';
import { Tally } from '../classes/Tally';
import { LocalStorageService } from './local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BaseTally {

  constructor(protected localStorageService: LocalStorageService) {}

  touch(tally: Tally): void {
    tally.setLastTouched(new Date());
  }

  save(tally: Tally): void {
    this.localStorageService.add(this.convertToLsTally(tally));
  }

  update(tally: Tally): void {
    this.touch(tally);
    this.localStorageService.update(this.convertToLsTally(tally));
  }

  convertToLsTally(tally: Tally): Object {
    const plainObject: Object = Object.assign({}, tally);
    return plainObject;
  }
}
