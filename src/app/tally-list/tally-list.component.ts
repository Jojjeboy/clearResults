import { Component } from '@angular/core';
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

  increse(tally: Tally) {
    this.tallyService.increse(tally);
    this.tallies = this.tallyService.sortByLastTouched();
  }
  
  decrese(tally: Tally) {
    this.tallyService.decrese(tally);
    this.tallies = this.tallyService.sortByLastTouched();
  }


  // Update show all
  eventCheck(event: any){
    let config = this.localStorageService.getConfig();
    this.showAll = event.target.checked;
    config.showAll = this.showAll;
    this.localStorageService.saveConfig(config);
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
