import { Component, OnInit } from '@angular/core';
import { Tally } from '../classes/Tally';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { TallyService } from '../services/tally/tally.service';

@Component({
  selector: 'app-tally-list',
  templateUrl: './tally-list.component.html',
  styleUrls: ['./tally-list.component.scss']
})
export class TallyListComponent implements OnInit{

  tallies = Array<Tally>();
  showAll: boolean = true;

  constructor(
    private localStorageService: LocalStorageService,
    private tallyService: TallyService) {

    this.tallies = this.tallyService.getTallies();
    
  }
  
  ngOnInit(): void {
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

  eventCheck(event: any): void{
    let config = this.localStorageService.getConfig();
    this.showAll = event.target.checked;
    config.showAll = this.showAll;
    this.localStorageService.saveConfig(config);
  }

}
