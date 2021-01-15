import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Tally } from '../classes/Tally';
import { TallyService } from '../services/tally/tally.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.scss']
})
export class TallyComponent implements OnInit, OnDestroy {


  cleanHistoryModalData: Object = {};
  deleteModalData: Object = {};
  tally!: Tally;
  percentage = 0.00;
  editMode = false;
  tallyObservable!: Subscription; 

  @Output() tallyDelete = new EventEmitter<Tally>();


  constructor(
    private tallyService: TallyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.tallyObservable = this.tallyService.getTallyById(params['id']).subscribe(tally => {
        this.tally = tally;
      });
    });

    this.recalculatePercentage();
  }

  increase() {
    this.tallyService.increase(this.tally);
    this.recalculatePercentage();
  }

  decrease() {
    this.tallyService.decrease(this.tally);
    this.recalculatePercentage();
  }

  recalculatePercentage() {
    this.percentage = this.tallyService.recalculatePercentage(this.tally.getGoal(), this.tally.getValue());
  }

  cleanHistory() {
    this.cleanHistoryModalData = {
      open: true,
      header: 'Radera historik',
      body: 'Är du säker på att du vill radera historiken.\n Det verkar som det finns ' + this.tally.getHistory().length + ' dagars historik',
      footer: ''
    }
  }

  cleanHistoryConfirmed(): void {
    this.tallyService.cleanHistory(this.tally);
    this.cleanHistoryModalData = { open: false };
  }

  delete(): void {
    this.deleteModalData = {
      open: true,
      header: 'Radera räknare',
      body: 'Är du säker på att du vill radera demma räknare.\n Detta går inte att ångra?'
    }
  }

  deleteConfirmed(): void {
    this.tallyService.delete(this.tally);
    this.router.navigate(['/'], { queryParams: { type: 'success', message: 'Räknare borttagen' } });
  }

  toggleActive(): void {
    this.tally.setActive(!this.tally.getActive());
    this.tallyService.update(this.tally);
  }

  ngOnDestroy() {
    this.tallyObservable.unsubscribe();
  }
}
