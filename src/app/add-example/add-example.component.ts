import { Component, OnInit } from '@angular/core';
import { UUIDService } from '../services/uuid/uuid.service';
import { TallyService } from '../services/tally/tally.service';
import { Tally } from '../classes/Tally';

@Component({
  selector: 'app-add-example',
  templateUrl: './add-example.component.html'
})
export class AddExampleComponent implements OnInit {

  tallies = Array<Tally>();

  pushupAdded: boolean = false;
  pushupTitle: string = 'Armhävningar';

  plankAdded: boolean = false;
  plankTitle: string = 'Plankan (30sek)';
  
  squatsAdded: boolean = false;
  squatsTitle: string = 'Squats';

  workoutdaysAdded: boolean = false;
  workoutdaysTitle: string = 'Träningsdagar';

  constructor(
    private uuidService: UUIDService,
    private tallyService: TallyService) {
  }

  ngOnInit() {
    const examples = Array<Tally>();
    this.setStatus();
  }

  addPushups() {
    const yesterday = ( d => 
      new Date(d.setDate(d.getDate()-1)) 
    )(new Date);

    const twoDaysago = ( d => 
      new Date(d.setDate(d.getDate()-3)) 
    )(new Date);

    const pushups = new Tally({
      title: this.pushupTitle,
      increseBy: 25,
      decreseBy: 25,
      resetEveryDay: true,
      uuid: this.uuidService.UUID(),
      value: 12,
      lastTouched: yesterday, 
      history: [{
        value: 125,
        date: twoDaysago
      }],
      goal: 100,
      topScore: 0,
      active: true
    });

    this.tallyService.save(pushups);
    this.pushupAdded = true;
  }

  addplank() {
    const plank = new Tally({
      title: this.plankTitle,
      increseBy: 10,
      decreseBy: 10,
      resetEveryDay: true,
      uuid: this.uuidService.UUID(),
      value: 0,
      lastTouched: new Date(),
      history: [],
      goal: 50,
      topScore: 0,
      active: true
    });

    this.tallyService.save(plank);
    this.plankAdded = true;
  }

  addSquats() {
    const squats = new Tally({
      title: this.squatsTitle,
      increseBy: 10,
      decreseBy: 10,
      resetEveryDay: true,
      uuid: this.uuidService.UUID(),
      value: 30,
      lastTouched: new Date(),
      history: [],
      goal: 300,
      topScore: 0,
      active: false
    });

    this.tallyService.save(squats);
    this.squatsAdded = true;
  }

  addWorkoutDays() {
    const squats = new Tally({
      title: this.workoutdaysTitle,
      increseBy: 1,
      decreseBy: 1,
      resetEveryDay: true,
      uuid: this.uuidService.UUID(),
      value: 0,
      lastTouched: new Date(),
      history: [],
      goal: 15,
      topScore: 3,
      active: true
    });

    this.tallyService.save(squats);
    this.workoutdaysAdded = true;
  }

  setStatus() {
    this.tallies = this.tallyService.getTallies();
    this.tallies.forEach(tally => {
      switch (tally.title) {
        case this.pushupTitle:
          this.pushupAdded = true;
          break;
        case this.plankTitle:
          this.plankAdded = true;
          break;
        case this.squatsTitle:
          this.squatsAdded = true;
          break;
        case this.workoutdaysTitle:
            this.workoutdaysAdded = true;
            break;
      }
    });
  }
}