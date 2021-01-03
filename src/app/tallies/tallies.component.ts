import { Component } from '@angular/core';
import { Tally } from '../classes/Tally';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { TallyService } from '../services/tally/tally.service';

@Component({
  selector: 'app-tallies',
  templateUrl: './tallies.component.html',
  styleUrls: ['./tallies.component.scss']
})
export class TalliesComponent  {

  tallies = Array<Tally>();
  public showAll: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private tallyService: TallyService) {

    tallyService.init();

    this.tallies = tallyService.convertLSToTallies(localStorageService.getAll());
    this.tallies = tallyService.sortByLastTouched(this.tallies);


    this.showAll = this.localStorageService.getConfig().showAll;

  }

  increse(tally: Tally) {
    this.tallyService.increse(tally);
    this.tallies = this.tallyService.sortByLastTouched(this.tallies);
  }
  
  decrese(tally: Tally) {
    this.tallyService.decrese(tally);
    this.tallies = this.tallyService.sortByLastTouched(this.tallies);
  }

  eventCheck(event: any){
    let config = this.localStorageService.getConfig();
    this.showAll = event.target.checked;
    config.showAll = this.showAll;
    this.localStorageService.saveConfig(config);
  }

  getShowAll() {
    return this.showAll;
  }

}
