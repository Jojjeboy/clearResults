import { Component, OnInit } from '@angular/core';
import { Tally } from '../classes/Tally';
import { TallyService } from '../services/tally/tally.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tally',
  templateUrl: './tally.component.html',
  styleUrls: ['./tally.component.scss']
})
export class TallyComponent implements OnInit {

  
  tally!: Tally;
  percentage = 0.00;
  editMode = false;
  private tallyCopy: any;

  constructor(private tallyService: TallyService, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.tally = this.tallyService.getTallyById(params['id']);
      

      // In a real app: dispatch action to load the details here.
   });
    //this.tally = this.tallyService.getTallyById();
    //this.recalculatePercentage();
  }
  
  increase() {
    //this.tallyIncrese.emit(this.tally);
    this.recalculatePercentage();
  }

  decrease() {
    //this.tallyDecrese.emit(this.tally);
    this.recalculatePercentage();
  }

  recalculatePercentage() {
    //this.percentage = this.tallyService.recalculatePercentage(this.tally.getGoal(), this.tally.getValue());
  }

  cleanHistory(tally: Tally): void {
    this.tallyService.cleanHistory(this.tally);
  }

  edit(): void{
    alert('Not implemented');
  }
  
  update() :void{
    
  }
  
  discard(): void{
    this.editMode = false;
    this.tally = this.tallyService.cloneTally(this.tallyCopy);
    
    // this.tally.setName(this.tallyCopy.getName());
    // this.tally.setValue(this.tallyCopy.getValue());
    // this.tally.setGoal(this.tallyCopy.getGoal());
    // this.tally.setDecreseBy(this.tallyCopy.getDecreseBy());
    // this.tally.setIncreseBy(this.tallyCopy.getIncreseBy());
  }





}
