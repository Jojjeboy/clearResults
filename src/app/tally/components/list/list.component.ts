import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tally } from '../../types/Tally';
import { History } from '../../../history/types/History';
import { LocalStorageService } from '../../../shared/service/local-storage/local-storage.service';
import { TallyService } from '../../service/tally.service';
import { BaseTally } from 'src/app/shared/service/baseTally/baseTally.service';
import { BaseTallyComponent } from 'src/app/shared/components/base-tally/base-tally.component';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseTallyComponent implements OnInit, OnDestroy{

  tallies = Array<Tally>();
  showAll: boolean = true;
  tallyListObservable!: Subscription;
  tallyFetched: boolean = false;
  

  constructor(
    protected localStorageService: LocalStorageService,
    protected tallyService: TallyService) {
      super(tallyService);
  }

  ngOnInit(): void {

    this.showAll = this.localStorageService.getConfig().showAll;
    this.tallyListObservable = this.tallyService.getTallies().subscribe(tallies => {
      this.tallyFetched = true;
      this.tallies = tallies;
    });
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


  ngOnDestroy() {
    this.tallyListObservable.unsubscribe();
  }

}
