import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tally } from '../classes/Tally';
import { TallyService } from '../services/tally/tally.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.scss']
})
export class TallyComponent implements OnInit {


  cleanHistoryModalData: Object = {};
  deleteModalData: Object = {};
  toggleActivityModalData: Object = {};
  tally!: Tally;
  percentage = 0.00;
  editMode = false;
  @Output() tallyDelete = new EventEmitter<Tally>();


  constructor(
    private tallyService: TallyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.tally = this.tallyService.getTallyById(params['id']);
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
    const setActiveText = this.tally.getActive() === true ? 'inaktivera' : 'aktivera';
    this.toggleActivityModalData = {
      open: true,
      header: setActiveText + ' räknare?',
      body: 'Är du säker på att du vill ' + setActiveText + ' denna räknare'
    }
  }

  toggleActiveConfirmed(): void {
    this.tally.setActive(!this.tally.getActive());
    this.tallyService.update(this.tally);
    this.toggleActivityModalData = { open: false };
  }









}
