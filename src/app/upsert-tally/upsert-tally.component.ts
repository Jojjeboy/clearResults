import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Tally } from '../classes/Tally';
import { TallyService } from '../services/tally/tally.service';
import { UUIDService } from '../services/uuid/uuid.service';
import { Subscription } from 'rxjs';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-upsert-tally',
  templateUrl: './upsert-tally.component.html',
  styleUrls: ['./upsert-tally.component.scss']
})
export class UpsertTallyComponent implements OnInit, OnDestroy {

  cleanHistoryModalData: Object = {};
  deleteModalData: Object = {};
  toggleActivityModalData: Object = {};

  editMode: boolean = false;
  editId!: string;
  tally!: Tally;
  tallyObservable!: Subscription;

  tallyForm = new FormGroup({
    title: new FormControl(''),
    increseBy: new FormControl(0),
    decreseBy: new FormControl(0),
    resetEveryDay: new FormControl(true),
    value: new FormControl(''),
    goal: new FormControl(0),
    topScore: new FormControl(0),
    active: new FormControl(0)
  });

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
      
      try {
        this.tallyObservable = this.tallyService.getTallyById(this.editId).subscribe(tally => {
          this.tally = tally;
        });
      }
      catch (e) {
        console.log(e);
        this.location.back();
      }
    }
    else {
      this.tally = this.tallyService.getEmptyTally();
      this.tally.setUuid(this.uUIDService.UUID());
    }
  }


  ngOnDestroy(): void {
    this.tallyObservable.unsubscribe();
  }

}
