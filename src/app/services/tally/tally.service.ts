import { Injectable } from '@angular/core';
import { Tally } from '../../classes/Tally';
import { History } from '../../classes/History';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { applicationversion } from '../../../environments/applicationversion';

@Injectable({
  providedIn: 'root'
})
export class TallyService {

  lsTallies = Array<Object>();
  tallies: Array<Tally> = [];
  
  percentage = 0.00;
  private showAll = false;

  constructor(private localStorageService: LocalStorageService) {
    this.lsTallies = <Array<Object>>this.localStorageService.getAll();
    this.tallies = <Array<Tally>>this.convertLSToTallies(this.lsTallies);

    this.resetOldTallyCounter();
    this.updateAppVersion();
  }

  getTallies(): Array<Tally>{
    return this.sortByActive();
  }

  recalculatePercentage(goal: number, value: number): number {
    let percentage = 0.00;
    if (goal !== null && value !== null) {
      percentage = (value / goal * 100);
      percentage = parseInt(percentage.toString(), 10);
      if (isNaN(this.percentage)) {
        percentage = 0;
      }
    }
    return percentage;
  }

  getTallyById(id: String): Tally{
    let tally: Tally = this.getEmptyTally();
    this.tallies.forEach(eachTally => {
      if(eachTally.getUuid() === id){
        tally = eachTally;
      }
    });

    return tally;
  }

  resetOldTallyCounter(): void {
    for (const tallyCounter of this.tallies) {
      if (this.isOld(tallyCounter)) {
        this.addToHistory(tallyCounter);
        tallyCounter.setValue(0);
        this.localStorageService.update(this.convertToLsTally(tallyCounter));
      }
    }
  }

  isOld(tally: Tally): Boolean {
    const now = new Date();
    return now.getDate() !== tally.getLastTouched().getDate();
  }

  addToHistory(tally: Tally): void {
    return;
    const tallyHistory: Array<History> = tally.getHistory();
    if (tallyHistory.length < 1) {

      const newHistoryEntry = new History({
        value: tally.getValue(),
        date: tally.getLastTouched()
      });
      tallyHistory.push(newHistoryEntry);
      tally.setHistory(tallyHistory);
      this.localStorageService.update(this.convertToLsTally(tally));
    }
    else {
      tallyHistory.forEach(history => {
        if (new Date(history.date).toDateString() !== tally.getLastTouched().toDateString()) {
          const newHistoryEntry = new History({
            value: tally.getValue(),
            date: tally.getLastTouched()
          });
          tallyHistory.push(newHistoryEntry);
          tally.setHistory(tallyHistory);
          this.localStorageService.update(this.convertToLsTally(tally));
        }
      });
    }
  }

  increase(tally: Tally): void {
    let tallyValue = tally.getValue();
    const tallyIncreseBy = tally.getIncreseBy();
    tallyValue += tallyIncreseBy;
    tally.setValue(tallyValue);
    if (tallyValue > tally.getTopScore()) {
      tally.setTopScore(tally.getValue());
    }
    this.update(tally);
  }

  decrease(tally: Tally): void {
    let tallyValue = tally.getValue();
    const tallyIncreseBy = tally.getDecreseBy();
    if (tallyValue > 0) {
      tallyValue -= tallyIncreseBy;
      tally.setValue(tallyValue);
      this.update(tally);
    }
  }

  cleanHistory(tally: Tally): void {
    tally.setHistory([]);
    this.update(tally);
  }

  convertLSToTallies(lsTallies: Array<object>): Array<Tally> {
    const returnArr = new Array<Tally>();
    for (const obj of lsTallies) {
      const tallyCounter = new Tally(obj);
      tallyCounter.setLastTouched(new Date(tallyCounter.getLastTouched()));
      returnArr.push(tallyCounter);
    }
    return returnArr;
  }

  convertToLsTally(tallyCounter: Tally): Object {
    const po = Object.assign({}, tallyCounter);
    return po;
  }

  getEmptyTally() {
    return new Tally({
      name: null,
      increseBy: null,
      decreseBy: null,
      resetEveryDay: true,
      uuid: null,
      value: 0,
      lastTouched: null,
      history: [],
      goal: null,
      topScore: 0,
      active: true
    });
  }

  save(tally: Tally): void {
    this.localStorageService.add(this.convertToLsTally(tally));
  }

  update(tally: Tally): void {
    this.touch(tally);
    this.localStorageService.update(this.convertToLsTally(tally));
  }

  delete(deleteTally: Tally): void {
    const index = this.tallies.indexOf(deleteTally);
    if(index > -1){
      this.tallies.splice(index, 1);
    }
    this.localStorageService.removeItem(deleteTally.getUuid());
  }

  touch(tally: Tally): void {
    tally.setLastTouched(new Date());
  }

  toggleShowAll(): void {
    let config = this.localStorageService.getConfig();
    this.showAll = !this.showAll;
    config.showAll = this.showAll;
    this.localStorageService.saveConfig(config);
  }

  getShowAll(): boolean {
    return this.showAll;
  }

  removeDuplicatesInHistory() {
    this.tallies.forEach(tally => {
      let arr = tally.getHistory();
      arr = arr.filter((history:any, index:any, self:any) =>
        index === self.findIndex((t:any) => (
          t.date === history.date && t.value === history.value
        ))
      );
      tally.setHistory(arr);
      this.update(tally);
    });
  }


  sortByLastTouched(): Array<Tally> {
    let sortedArray: Tally[] = this.tallies.sort((obj1, obj2) => {
      if (obj1.lastTouched < obj2.lastTouched) {
        return 1;
      }

      if (obj1.lastTouched > obj2.lastTouched) {
        return -1;
      }

      return 0;
    });
    return sortedArray;
  }

  sortByActive(): Array<Tally> {
    let sortedArray: Tally[] = this.tallies.sort((obj1, obj2) => {
      if (obj1.active < obj2.active) {
        return 1;
      }

      if (obj1.active > obj2.active) {
        return -1;
      }

      return 0;
    });
    return sortedArray;
  }

  private updateAppVersion(): void {
    let config = this.localStorageService.getConfig();
    let foundVersion = false;
    if (!config.appVersion) {
      config["appVersion"] = [];
    }
    
    for(let i = 0; i < config.appVersion.length; i++){
      if (applicationversion.revision == config.appVersion[i].hash) {
        foundVersion = true;
      }
    }

    if (!foundVersion) {
      config.appVersion.push({
        date: new Date(),
        hash: applicationversion.revision,
      });
      this.localStorageService.saveConfig(config);
    }
  }

  private isObject(obj: any) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  public cloneTally(src: any): Tally{
    let target:any = {};
    for (let prop in src) {
      if (src.hasOwnProperty(prop)) {
        // if the value is a nested object, recursively copy all it's properties
        if (this.isObject(src[prop])) {
          target[prop] = this.cloneTally(src[prop]);
        } else {
          target[prop] = src[prop];
        }
      }
    }
    return new Tally(target);
  }
}
