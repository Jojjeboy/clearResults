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
    this.update(tally);
    return tally;
  }

  sortHistoryByDate(tally: Tally): History[]{
    let tallyHistory: History[] = tally.getHistory().sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    tally.setHistory(tallyHistory);
    return tallyHistory;
  }

  // Deprecated
  removeDuplicatesInHistory(tallies: Tally[]): void {
    tallies.forEach(tally => {
      let arr = tally.getHistory();
      arr = arr.filter((history: any, index: any, self: any) =>
        index === self.findIndex((t: any) => (
          t.date === history.date && t.value === history.value
        ))
      );
      tally.setHistory(arr);
      this.update(tally);
    });
  }
}
