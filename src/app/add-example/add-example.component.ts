import { Component, OnInit } from '@angular/core';
import { UUIDService } from '../services/uuid/uuid.service';
import { TallyService } from '../services/tally/tally.service';
import { Tally } from '../classes/Tally';

@Component({
  selector: 'app-add-example',
  templateUrl: './add-example.component.html',
  styleUrls: ['./add-example.component.scss']
})
export class AddExampleComponent implements OnInit {

  tallies = Array<Tally>();

  pushupAdded: boolean = false;
  pushupName: string = 'Armhävningar';

  plankAdded: boolean = false;
  plankName: string = 'Plankan (30sek)';
  
  squatsAdded: boolean = false;
  squatsName: string = 'Squats';

  workoutdaysAdded: boolean = false;
  workoutdaysName: string = 'Träningsdagar';

  constructor(
    private uuidService: UUIDService,
    private tallyService: TallyService) {
  }

  ngOnInit() {
    const examples = Array<Tally>();
    this.setStatus();

  }

  addPushups() {
    const pushups = new Tally({
      name: this.pushupName,
      increseBy: 25,
      decreseBy: 25,
      resetEveryDay: true,
      uuid: this.uuidService.UUID(),
      value: 0,
      lastTouched: new Date(),
      history: [],
      goal: 100,
      topScore: 0,
      active: true
    });

    this.tallyService.save(pushups);
    this.pushupAdded = true;
  }

  addplank() {
    const plank = new Tally({
      name: this.plankName,
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
      name: this.squatsName,
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
      name: this.workoutdaysName,
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
      switch (tally.name) {
        case this.pushupName:
          this.pushupAdded = true;
          break;
        case this.plankName:
          this.plankAdded = true;
          break;
        case this.squatsName:
          this.squatsAdded = true;
          break;
        case this.workoutdaysName:
            this.workoutdaysAdded = true;
            break;
      }
    });


  }
}