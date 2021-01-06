import { Component, OnInit } from '@angular/core';
import { Tally } from '../classes/Tally';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { TallyService } from '../services/tally/tally.service';

@Component({
  selector: 'app-tally-list',
  templateUrl: './tally-list.component.html',
  styleUrls: ['./tally-list.component.scss']
})
export class TallyListComponent {

  tallies = Array<Tally>();
  public showAll: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private tallyService: TallyService) {

    this.tallies = this.tallyService.getTallies();
    this.showAll = this.localStorageService.getConfig().showAll;

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

  editTally(): void{
    
  }

}
