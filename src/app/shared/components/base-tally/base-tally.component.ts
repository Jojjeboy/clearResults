import { Component, OnInit } from '@angular/core';
import { History } from 'src/app/history/types/History';
import { TallyService } from 'src/app/tally/service/tally.service';
import { Tally } from 'src/app/tally/types/Tally';
import { LocalStorageService } from '../../service/local-storage/local-storage.service';

@Component({
  selector: 'app-base-tally',
  template: ``
})
export class BaseTallyComponent {

  constructor(protected tallyService: TallyService){}

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
    if(tally.getResetOnInterval() && tally.getHistory().length > 2){
      return true;
    }
    return false;
  }

  increase(tally: Tally) {
    this.tallyService.increase(tally);
  }

  decrease(tally: Tally) {
    this.tallyService.decrease(tally);
  }

}
