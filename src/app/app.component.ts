import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clearResults';
  sub: any;
  showAlert: boolean = false;
  alertText!: string;
  alertType: string = 'error';

  modal = {
    open: false,
    header: '',
    body: '',
    footer: '',
    callBackFn: ''
  }

  constructor(private localStorageService: LocalStorageService,
    private route: ActivatedRoute, private router: Router) {
    this.localStorageService.init(this.title);
  }

  ngOnInit() {
    this.sub = this.route
      .queryParams
      .subscribe(params => {

        if(params.type && params.message){
          this.showAlert = true;
          this.alertText = params.message;
          this.alertType = params.type;

          setTimeout(() => {
            this.showAlert = false;
            this.alertText = '';
          }, 5000);
        }
      });
  }

  openModal(modalData: any): void {
    this.modal.open = modalData.open;
    this.modal.header = modalData.header;
    this.modal.body = modalData.body;
    this.modal.callBackFn = modalData.callBackFn;
  }

  closeModal(): void{
    this.modal.open = false;
    this.modal.header = '';
    this.modal.body = '';
    this.modal.callBackFn = '';
  }

  callBackConfirmed(callBackFn: string): void{
    if(callBackFn === 'clearCacheConfirmed') {
      this.clearCacheConfirmed();
    }
  }


  clearCache() {
    this.openModal({
      open: true,
      header: 'Radera Local Storage',
      body: 'Är du säker på att du vill radera all Local Storage',
      callBackFn: 'clearCacheConfirmed'
    });
  }

  clearCacheConfirmed() {
    this.localStorageService.clear();
    window.location.reload();
  } 
}
