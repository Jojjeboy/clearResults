import { Component, OnInit, Input } from '@angular/core';
import { Tally } from '../classes/Tally';

@Component({
  selector: 'app-history-summary',
  templateUrl: './history-summary.component.html',
  styleUrls: ['./history-summary.component.scss']
})
export class HistorySummaryComponent implements OnInit {

  @Input() tally!: Tally;
  

  ngOnInit(): void {
  }

}
