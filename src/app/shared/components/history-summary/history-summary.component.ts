import { Component, Input } from '@angular/core';
import { Tally } from '../../../tally/types/Tally';

@Component({
  selector: 'app-history-summary',
  templateUrl: './history-summary.component.html'
})
export class HistorySummaryComponent {

  @Input() tally!: Tally;
}