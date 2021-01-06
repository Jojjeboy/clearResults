import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-tally',
  templateUrl: './add-edit-tally.component.html',
  styleUrls: ['./add-edit-tally.component.scss']
})
export class AddEditTallyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  discard(): void{
    
    
    // this.tally.setName(this.tallyCopy.getName());
    // this.tally.setValue(this.tallyCopy.getValue());
    // this.tally.setGoal(this.tallyCopy.getGoal());
    // this.tally.setDecreseBy(this.tallyCopy.getDecreseBy());
    // this.tally.setIncreseBy(this.tallyCopy.getIncreseBy());
  }


}
