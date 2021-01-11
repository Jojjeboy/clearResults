import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TallyService } from '../services/tally/tally.service';
import { DateHelperService } from '../services/Date/date-helper.service';
import { Tally } from '../classes/Tally';
import { History } from '../classes/History';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-tally-history',
  templateUrl: './edit-tally-history.component.html',
  styleUrls: ['./edit-tally-history.component.scss']
})
export class EditTallyHistoryComponent implements OnInit {
  tally!: Tally;
  tallyHistory!: Array<History>;
  tallyHistoryEntry!: History;

  cleanHistoryConfirmedModalData: Object = {};
  newDateChosenModalData: Object = {};
  deleteHistoryModalData: Object = {};

  yesterday!: string;
  newHistory = {
    date: null,
    value: null
  };

  @ViewChild('inpt') input!: ElementRef;


  constructor(
    private tallyService: TallyService,
    private dateService: DateHelperService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.tally = this.tallyService.getTallyById(params['id']);
    });

    this.yesterday = this.dateService.formatDate((d =>
      new Date(d.setDate(d.getDate() - 1))
    )(new Date));

    this.tallyHistory = this.tally.getHistory();

  }

  // Alla datum som har valts kör denna funktionen
  // Oavsett om man redigerar gamla 
  // Är datumet nytt och unikt och man valt ett värde visa en länk för att lägga till ytterliggare 
  aNewHistoryDateIsChosen() {
   
  }

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

    //console.log(this.input.nativeElement.value);
    //console.log(event.target.value);
    

    let chosenDate = new Date(event.target.value);
    let chosenDateValid = true;
    let errorText: string = '';


    this.tally.getHistory().forEach(history => {
      // Valt datum finns redan i historiken
      let historyDateString = new Date(history.date).toDateString();
      if (historyDateString === chosenDate.toDateString()) {
        chosenDateValid = false;
        errorText = 'Valt datum: ' + historyDateString + ' finns redan i historiken, välj ett nytt datum!';
      }
    });

    // check if date alleady exist

    if (!chosenDateValid) {
      this.input.nativeElement.value = '';
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
    if(index > -1){
      this.tallyHistory.splice(index, 1);
    }
    this.deleteHistoryModalData = { open: false };

  }

  wrongDateConfirmed() {
    this.newDateChosenModalData = { open: false };
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
}
