import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TallyService } from '../services/tally/tally.service';
import { Tally } from '../classes/Tally';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-tally-history',
  templateUrl: './edit-tally-history.component.html',
  styleUrls: ['./edit-tally-history.component.scss']
})
export class EditTallyHistoryComponent implements OnInit {
  tally!: Tally;

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
    });
  }

  valid() {
    let valid = true;
    this.tally.getHistory().forEach(history => {
      if(isNaN(history.value) || history.value < 1){
        valid = false;
      }
    });
    return valid; 
  }

  save(): void {
    this.tallyService.update(this.tally);
    this.router.navigate(['/tally/' + this.tally.getUuid()]);
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
    this.tally.setHistory([]);
    this.tallyService.update(this.tally);
    this.closeModal();
    this.router.navigate(['/tally/' + this.tally.getUuid()]);
  }

  callBackConfirmed(methodToExecute: string): boolean {
    switch (methodToExecute) {
      case "cleanHistoryConfirmed": 
        this.cleanHistoryConfirmed(); 
        break;
    }
    return false;
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
