import { Injectable } from '@angular/core';
import { History } from 'src/app/classes/History';
import { Tally } from 'src/app/classes/Tally';
import { BaseTally } from '../baseTally.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService extends BaseTally {

  constructor(localStorageService: LocalStorageService) {
    super(localStorageService);
  }

  addToHistory(tally: Tally): Tally {
    const tallyHistory: Array<History> = tally.getHistory();
    const newHistoryEntry = new History({
      value: tally.getValue(),
      date: tally.getLastTouched()
    });
    if (tallyHistory.length < 1) {
      tallyHistory.push(newHistoryEntry);
      tally.setHistory(tallyHistory);
    }
    else {
      tallyHistory.forEach(history => {
        if (new Date(history.date).toDateString() !== tally.getLastTouched().toDateString()) {
          tallyHistory.push(newHistoryEntry);
          tally.setHistory(tallyHistory);
        }
      });
    }
    tally.setValue(0);
    this.update(tally);
    return tally;
  }

  cleanHistory(tally: Tally): Tally {
    tally.setHistory([]);
    return tally;
  }

  sortHistoryByDate(tally: Tally): History[]{
    let tallyHistory: History[] = tally.getHistory().sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    tally.setHistory(tallyHistory);
    return tallyHistory;
  }
}
