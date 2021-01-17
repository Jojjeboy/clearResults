import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { History } from '../classes/History';
import { Tally } from '../classes/Tally';

import { DateHelperService } from '../services/Date/date-helper.service';
import { TallyService } from '../services/tally/tally.service';


@Component({
  selector: 'app-edit-tally-history2',
  templateUrl: './edit-tally-history2.component.html',
  styleUrls: ['./edit-tally-history2.component.scss']
})
export class EditTallyHistory2Component implements OnInit, OnDestroy {
  tally!: Tally;
  tallyHistory!: Array<History>;

  cleanHistoryConfirmedModalData: Object = {};
  newDateChosenModalData: Object = {};
  deleteHistoryModalData: Object = {};

  tallyObservable!: Subscription;


  historyForm!: FormGroup;

  yesterday: String = this.dateService.getDayOffset(1,0).toISOString().substring(0, 16);



  firstDate: Date = new Date();




  constructor(
    private tallyService: TallyService,
    private dateService: DateHelperService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {


  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tallyObservable = this.tallyService.getTallyById(params['id']).subscribe(tally => {
        this.tally = tally;
        this.tallyHistory = tally.getHistory();

        let fgArr: any = [];

        this.tallyHistory.forEach(hist => {
          fgArr.push(
            this.fb.group({
              date: new FormControl(hist.getDate().toISOString().substring(0, 16)),
              value: hist.getValue()
            })
          );
        });

        
        this.historyForm = this.fb.group({
    
          histories: this.fb.array(fgArr)
    
        });


      });
    });
  }

  histories() : FormArray {

    return this.historyForm.get("histories") as FormArray

  }

   

  newHistory(): FormGroup {

    return this.fb.group({

      date: this.yesterday,

      value: 0,

    })

  }

   

  addHistory() {

    this.histories().push(this.newHistory());

  }

   

  removeHistory(i:number) {

    this.histories().removeAt(i);

  }

   

  onSubmit() {

    console.log(this.historyForm.value);

  }



  ngOnDestroy(): void {
    this.tallyObservable.unsubscribe();
  }

}
