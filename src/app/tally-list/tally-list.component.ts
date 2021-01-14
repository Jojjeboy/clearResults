import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tally } from '../classes/Tally';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { TallyService } from '../services/tally/tally.service';

@Component({
  selector: 'app-tally-list',
  templateUrl: './tally-list.component.html',
  styleUrls: ['./tally-list.component.scss']
})
export class TallyListComponent implements OnInit, OnDestroy {

  tallies = Array<Tally>();
  showAll: boolean = true;
  tallyListObservable!: Subscription;

  constructor(
    private localStorageService: LocalStorageService,
    private tallyService: TallyService) {
  }

  ngOnInit(): void {

    this.showAll = this.localStorageService.getConfig().showAll;
    this.tallyListObservable = this.tallyService.getObservableTallies().subscribe(tallies => {
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
    let exist = false;
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

  ngOnDestroy() {
    this.tallyListObservable.unsubscribe();
  }

}
