import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Tally } from '../classes/Tally';
import { TallyService } from '../services/tally/tally.service';
import { UUIDService } from '../services/uuid/uuid.service';

@Component({
  selector: 'app-add-edit-tally',
  templateUrl: './add-edit-tally.component.html',
  styleUrls: ['./add-edit-tally.component.scss']
})
export class AddEditTallyComponent implements OnInit {

  editMode: boolean = false;
  editId!: string;
  tally!: Tally;

  modal = {
    open: false,
    header: '',
    body: '',
    footer: '',
    callBackFn: ''
  }

  constructor(
    private location: Location,
    private router: Router,
    private tallyService: TallyService,
    private uUIDService: UUIDService) {

  }

  ngOnInit(): void {
    this.setupMode();
  }

  setupMode(): void {
    if (this.location.path().split('/').length === 3) {
      this.editMode = true;
      this.editId = this.location.path().split('/')[2];
      this.tally = this.tallyService.getTallyById(this.editId);
    }
    else {
      this.tally = this.tallyService.getEmptyTally();
      this.tally.setUuid(this.uUIDService.UUID());
    }
  }

  discard() {
    this.location.back();
  }

  save() {
    if(this.editMode) {
      this.tallyService.update(this.tally);
    }
    else {
      this.tallyService.touch(this.tally);
      this.tallyService.save(this.tally);
    }
    this.router.navigate(['/']);
  }

  resetEveryDay(bool: boolean){
    this.tally.setResetEveryday(bool);
    if(!bool && this.tally.getHistory().length > 0){
      this.openModal({
        open: true,
        header: 'Radera historik',
        body: 'Är du säker på att du vill radera historik?\nDet verkar finnas ' + this.tally.getHistory().length + ' dagars historik',
        callBackFn: 'cleanHistoryConfirmed'
      });
    }
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
    this.closeModal();
  }

  callBackConfirmed(methodToExecute: string): boolean {
    switch (methodToExecute) {
      case "cleanHistoryConfirmed": 
        this.cleanHistoryConfirmed(); 
        break;
    }
    return false;
  }

  toggleActive() {
    this.tally.setActive(!this.tally.getActive());
  }

  valid() : boolean{
    let valid = true;
    if(!this.tally.getTitle() || this.tally.getTitle().length < 3){
      valid = false;
    }
    if(!this.tally.getIncreseBy()){
      valid = false;
    }
    if(!this.tally.getDecreseBy()){
      valid = false;
    }
    if(!this.tally.getGoal()){
      valid = false;
    }
    if(this.tally.getResetEveryday() === null){
      valid = false;
    }
    return valid;
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
