import { Component, OnDestroy, OnInit } from '@angular/core';
import { TallyService } from '../services/tally/tally.service';
import { Tally } from '../classes/Tally';
import { Subscription } from 'rxjs';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-add-example',
  templateUrl: './add-example.component.html'
})
export class AddExampleComponent implements OnInit, OnDestroy {

  constructor(
    private tallyService: TallyService,
    private httpService: HttpService
  ) {
  }

  tallies = Array<Tally>();
  talliesFromJson = Array<Tally>();
  talliesAdded: string[] = [];

  tallyListObservable!: Subscription;

  ngOnInit() {
    const examples = Array<Tally>();
    this.tallyListObservable = this.tallyService.getTallies().subscribe((tallies: Tally[]) => {
      tallies.forEach((tally: Tally) => {
        this.talliesAdded.push(tally.getUuid());
      })
    });

    this.httpService.getExamplesOnly().subscribe((data: any) => {
      console.log(data);
      this.talliesFromJson = this.tallyService.convertLSToTallies(data.data);
    });

  }

  addExampleTally(uuid: string): void {
    this.talliesFromJson.forEach((tally: Tally) => {
      if (uuid === tally.getUuid()) {
        this.tallyService.save(tally);
        this.talliesAdded.push(uuid);
        // Also mark it done
      }
    });
  }

  tallyAdded(uuid: string): boolean {
    return this.talliesAdded.indexOf(uuid) > -1;
  }

  ngOnDestroy(): void {
    this.tallyListObservable.unsubscribe();
  }
}