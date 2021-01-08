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


  tally!: Tally;
  percentage = 0.00;
  editMode = false;
  @Output() tallyDelete = new EventEmitter<Tally>();

  modal = {
    open: false,
    header: '',
    body: '',
    footer: '',
    callBackFn: ''
  }

  constructor(
    private tallyService: TallyService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.tally = this.tallyService.getTallyById(params['id']);

      // In a real app: dispatch action to load the details here.
    });
    //this.tally = this.tallyService.getTallyById();
    //this.recalculatePercentage();
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
    this.openModal({
      open: true,
      header: 'Radera historik',
      body: 'Är du säker på att du vill radera historik?\nDet verkar finnas ' + this.tally.getHistory().length + ' dagars historik',
      callBackFn: 'cleanHistoryConfirmed'
    });
  }

  cleanHistoryConfirmed(): void {
    this.tallyService.cleanHistory(this.tally);
    this.closeModal();
  }

  toggleActive(): void {
    const setActiveText = this.tally.getActive() === true ? 'inaktivera' : 'aktivera';
    this.openModal({
      open: true,
      header: setActiveText+ ' räknare?',
      body: 'Är du säker på att du vill '+ setActiveText +' denna räknare',
      callBackFn: 'toggleActiveConfirmed'
    });
  }

  toggleActiveConfirmed(): void{
    this.tally.setActive(!this.tally.getActive());
    this.tallyService.update(this.tally);
    this.closeModal();
  }
  
  delete(): void {
    this.openModal({
      open: true,
      header: 'Radera',
      body: 'Är du säker på att du vill radera denna räknare',
      callBackFn: 'deleteConfirmed'
    });
  }
  
  deleteConfirmed(): void {
    this.tallyService.delete(this.tally);
    this.router.navigate(['/'], { queryParams: {type: 'success', message: 'Räknare borttagen'}});
  }

  callBackConfirmed(methodToExecute: string): boolean {
    switch (methodToExecute) {
      case "cleanHistoryConfirmed": 
        this.cleanHistoryConfirmed(); 
        break;
      case "deleteConfirmed": 
        this.deleteConfirmed(); 
        break;
      case "toggleActiveConfirmed": 
        this.toggleActiveConfirmed(); 
        break;
    }
    return false;
  }

  edit(): void {
    alert('Not implemented');
  }


  openModal(modalData: any): void {
    this.modal.open = modalData.open;
    this.modal.header = modalData.header;
    this.modal.body = modalData.body;
    this.modal.callBackFn = modalData.callBackFn;
  }

  closeModal(): void{
    this.modal.open = false;
    this.modal.header = '';
    this.modal.body = '';
    this.modal.callBackFn = '';
  }



}
