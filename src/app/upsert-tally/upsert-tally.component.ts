import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Tally } from '../classes/Tally';
import { TallyService } from '../services/tally/tally.service';
import { UUIDService } from '../services/uuid/uuid.service';
import { Subscription } from 'rxjs';

import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  tallyForm!: FormGroup;


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
    this.setupFormGroup(this.tally)
  }


  setupFormGroup(tally: Tally): void {
    
    this.tallyForm = new FormGroup({
      title: new FormControl(tally.getTitle(), [Validators.required]),
      increseBy: new FormControl(tally.getIncreseBy(), [Validators.required]),
      decreseBy: new FormControl(tally.getDecreseBy(), [Validators.required]),
      resetEveryDay: new FormControl(tally.getActive(), [Validators.required]),
      value: new FormControl(tally.getValue(), [Validators.required]),
      goal: new FormControl(tally.getGoal(), [Validators.required]),
      topScore: new FormControl(tally.getTopScore(), [Validators.required])
    });
  }

  onSubmit() {
    
    this.tally.setTitle(this.tallyForm.value.title);
    this.tally.setIncreseBy(this.tallyForm.value.increseBy);
    this.tally.setDecreseBy(this.tallyForm.value.decreseBy);
    this.tally.setResetEveryday(this.tallyForm.value.resetEveryDay);
    this.tally.setGoal(this.tallyForm.value.goal);
    this.tally.setTopScore(this.tallyForm.value.topScore);
    this.tally.setValue(this.tallyForm.value.value);
    this.tally.setLastTouched(new Date());
    
    let action: string = 'skapad';
    if(this.editMode){
      this.tallyService.update(this.tally);
      action = 'uppdaterad';
    }
    else {
      this.tallyService.save(this.tally);
    }
    this.router.navigate(['/tally/' + this.tally.getUuid()], { queryParams: { type: 'success', message: 'Räknare ' + action} });
  }


  ngOnDestroy(): void {
    if(this.editMode){
      this.tallyObservable.unsubscribe();
    }
  }

}