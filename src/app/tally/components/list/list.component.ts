import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tally } from '../../types/Tally';
import { History } from '../../../history/types/History';
import { LocalStorageService } from '../../../shared/service/local-storage/local-storage.service';
import { TallyService } from '../../service/tally.service';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  tallies = Array<Tally>();
  showAll: boolean = true;
  tallyListObservable!: Subscription;
  tallyFetched: boolean = false;
  

  constructor(
    private localStorageService: LocalStorageService,
    private tallyService: TallyService) {
  }

  ngOnInit(): void {

    this.showAll = this.localStorageService.getConfig().showAll;
    this.tallyListObservable = this.tallyService.getTallies().subscribe(tallies => {
      this.tallyFetched = true;
      this.tallies = tallies;
    });
  }

  increase(tally: Tally) {
    this.tallyService.increase(tally);
  }

  decrese(tally: Tally) {
    this.tallyService.decrease(tally);
  }

  getShowAll() {
    return this.showAll;
  }

  calculatePercentage(tally: Tally): number {
    return this.tallyService.recalculatePercentage(tally.getGoal(), tally.getValue());
  }

  inactiveTallysExist(): boolean {
    let exist = false;;
    this.tallies.forEach(tally => {
      if (!tally.getActive()) {
        exist = true;
      }
    });
    return exist;
  }

  eventCheck(event: any): void {
    let config = this.localStorageService.getConfig();
    this.showAll = event.target.checked;
    config.showAll = this.showAll;
    this.localStorageService.saveConfig(config);
  }

  getDynamicTallyGoal(histories: History[]): number {
    let total:number = 0;
    let dynamicGoal:number = 0;

    histories.forEach((history: History) => {
      total =+ history.getValue();
    });

    dynamicGoal = total * 1.1 / histories.length;

    if(!isNaN(dynamicGoal)){

    }
    return Math.round(dynamicGoal);
  }

  showDynamicGoal(tally: Tally): boolean {
    if(tally.getResetEveryday() && tally.getHistory().length > 2){
      return true;
    }
    return false;
  }

  ngOnDestroy() {
    this.tallyListObservable.unsubscribe();
  }

}
