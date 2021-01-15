import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TallyService } from '../services/tally/tally.service';
import { DateHelperService } from '../services/Date/date-helper.service';
import { Tally } from '../classes/Tally';
import { History } from '../classes/History';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-tally-history',
  templateUrl: './edit-tally-history.component.html',
  styleUrls: ['./edit-tally-history.component.scss']
})
export class EditTallyHistoryComponent implements OnInit, OnDestroy {
  tally!: Tally;
  tallyHistory!: Array<History>;
  tallyHistoryEntry!: History;

  cleanHistoryConfirmedModalData: Object = {};
  newDateChosenModalData: Object = {};
  deleteHistoryModalData: Object = {};

  tallyObservable!: Subscription;

  yesterday!: string;
  newHistory = {
    date: null,
    value: null
  };

  @ViewChild('newDateInput') newDateInput!: ElementRef;
  @ViewChild('newValueInput') newValueInput!: ElementRef;


  constructor(
    private tallyService: TallyService,
    private dateService: DateHelperService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.tallyObservable = this.tallyService.getTallyById(params['id']).subscribe(tally => {
        this.tally = tally;
      });
    });

    this.yesterday = this.dateService.formatDate((d =>
      new Date(d.setDate(d.getDate() - 1))
    )(new Date));

    this.tallyHistory = this.tally.getHistory();
    this.sortHistoryByDate();

  }

  // Alla datum som har valts kör denna funktionen
  // Oavsett om man redigerar gamla 
  // Är datumet nytt och unikt och man valt ett värde visa en länk för att lägga till ytterliggare 


  // Kollar om en datum sträng redan finns med i tally historyn
  dateAlreadyExistInHistory(inDateString: string): boolean {
    let dateExistAlready = false;
    this.tallyHistory.forEach(history => {
      // Valt datum finns redan i historiken
      let historyDateString = new Date(history.date).toDateString();
      if (historyDateString === inDateString) {
        dateExistAlready = true;
      }
    });

    return dateExistAlready;
  }


  newDateChosen(event: any) {

    let chosenDateValid = true;

    let chosenDate = new Date(event.target.value);
    let errorText: string = '';


    this.tallyHistory.forEach(history => {
      // Valt datum finns redan i historiken
      let historyDateString = new Date(history.date).toDateString();
      if (historyDateString === chosenDate.toDateString()) {
        chosenDateValid = false;
        errorText = 'Valt datum: ' + historyDateString + ' finns redan i historiken, välj ett nytt datum!';
      }
    });

    // check if date alleady exist
    if (!chosenDateValid) {

      this.newDateChosenModalData = {
        open: true,
        header: 'Datum valt',
        body: errorText,
        footer: ''
      }
    }
  }



  deleteHistory(history: History): void {
    this.deleteHistoryModalData = {
      open: true,
      header: 'Radera historik',
      body: 'Är du säker på att du vill radera historik för datum: ' + new Date(history.date).toDateString()
    }
    this.tallyHistoryEntry = history;
  }

  deleteHistoryConfirmed(): void {
    const index = this.tallyHistory.indexOf(this.tallyHistoryEntry);
    if (index > -1) {
      this.tallyHistory.splice(index, 1);
    }
    this.deleteHistoryModalData = { open: false };
    this.newDateInput.nativeElement.value = '';
    this.save();
  }

  wrongDateConfirmed() {
    this.newDateChosenModalData = { open: false };
    this.newDateInput.nativeElement.value = '';
  }

  addHistory() {

    const newHistory: History = new History(
      {
        date: new Date(this.newDateInput.nativeElement.value).toISOString(),
        value: parseInt(this.newValueInput.nativeElement.value)
      });

    this.tallyHistory.push(newHistory);

    this.newDateInput.nativeElement.value = '';
    this.newValueInput.nativeElement.value = '';

    this.sortHistoryByDate();
  }


  addNewHistoryValid() {
    if (this.newDateInput && this.newValueInput) {

      if (this.newDateInput.nativeElement.value !== '' && this.newValueInput.nativeElement.value !== '') {
        return true;
      }
    }
    return false;
  }

  valid() {
    let valid = true;
    this.tally.getHistory().forEach(history => {
      if (isNaN(history.value) || history.value < 0) {
        valid = false;
      }
    });
    //  kolla så att man fyllt i ny historik eller att den är helt tom
    return valid;
  }

  save(): void {
    this.sortHistoryByDate();
    this.tallyService.update(this.tally);
    this.router.navigate(['/tally/' + this.tally.getUuid()]);
  }

  cleanHistory() {
    this.cleanHistoryConfirmedModalData = {
      open: true,
      header: 'Radera historik',
      body: 'Är du säker på att du vill radera historiken.\n Det verkar som det finns ' + this.tally.getHistory().length + ' dagars historik',
      footer: ''
    }
  }

  cleanHistoryConfirmed(): void {
    this.tally.setHistory([]);
    this.tallyService.update(this.tally);
    this.router.navigate(['/tally/' + this.tally.getUuid()]);
  }

  sortHistoryByDate() {
    this.tallyHistory.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();

    });

    this.tally.setHistory(this.tallyHistory);
    this.tallyHistory = this.tally.getHistory();
  }

  ngOnDestroy(): void {
    this.tallyObservable.unsubscribe();
  }
}
