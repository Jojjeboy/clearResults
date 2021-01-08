import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Tally } from '../classes/Tally';
import { TallyService } from '../services/tally/tally.service';

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
    private tallyService: TallyService) {

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

    }
  }

  discard() {
    this.location.back();
  }

  update() {
    
  }

  toggleActive() {
    this.tally.setActive(!this.tally.getActive());
  }





}
