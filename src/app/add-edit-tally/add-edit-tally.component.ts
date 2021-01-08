import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  constructor(
    private route: ActivatedRoute,
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
      
      this.tallyService.save(this.tally);
    }
    this.router.navigate(['/']);
  }

  resetEveryDay(bool: boolean){
    this.tally.setResetEveryday(bool);
  }

  toggleActive() {
    this.tally.setActive(!this.tally.getActive());
  }

  valid() : boolean{
    let valid = true;
    if(!this.tally.getName() || this.tally.getName().length < 3){
      valid = false;
    }
    if(!this.tally.getIncreseBy() || this.tally.getIncreseBy().toString.length < 1){
      valid = false;
    }
    if(!this.tally.getDecreseBy()){
      valid = false;
    }
    if(!this.tally.getGoal()){
      valid = false;
    }

    return valid;
  }

}
