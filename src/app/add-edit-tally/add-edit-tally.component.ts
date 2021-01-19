import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Tally } from '../classes/Tally';
import { TallyService } from '../services/tally/tally.service';
import { UUIDService } from '../services/uuid/uuid.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-tally',
  templateUrl: './add-edit-tally.component.html',
  styleUrls: ['./add-edit-tally.component.scss']
})
export class AddEditTallyComponent implements OnInit, OnDestroy {

  cleanHistoryModalData: Object = {};
  deleteModalData: Object = {};
  toggleActivityModalData: Object = {};

  editMode: boolean = false;
  editId!: string;
  tally!: Tally;
  tallyObservable!: Subscription;

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
      this.tallyObservable = this.tallyService.getTallyById(this.editId).subscribe(tally => {
        this.tally = tally;
      });
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
    if (this.editMode) {
      this.tallyService.update(this.tally);
    }
    else {
      this.tallyService.touch(this.tally);
      this.tallyService.save(this.tally);
    }
    this.router.navigate(['/']);
  }

  resetEveryDay(bool: boolean) {
    this.tally.setResetEveryday(bool);
    if (!bool && this.tally.getHistory().length > 0) {
      this.cleanHistory();
    }
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
    this.tally.setHistory([]);
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

  toggleActive() {
    this.tally.setActive(!this.tally.getActive());
  }

  valid(): boolean {
    let valid = true;
    if (!this.tally.getTitle() || this.tally.getTitle().length < 3) {
      valid = false;
    }
    if (!this.tally.getIncreseBy()) {
      valid = false;
    }
    if (!this.tally.getDecreseBy()) {
      valid = false;
    }
    if (!this.tally.getGoal()) {
      valid = false;
    }
    if (this.tally.getResetEveryday() === null) {
      valid = false;
    }
    return valid;
  }

  ngOnDestroy(): void {
    this.tallyObservable.unsubscribe();
  }
}
