import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { applicationversion } from '../environments/applicationversion';

export interface Appversion {
  version: string
  revision: string
  branch: string
  date: string
}
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
  appVersion:Appversion  = applicationversion;
  showAppVersion:boolean = false;

  modal = {
    open: false,
    header: '',
    body: '',
    footer: '',
    callBackFn: ''
  }
  versionModal = {
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

        if (params.type && params.message) {
          this.showAlert = true;
          this.alertText = params.message;
          this.alertType = params.type;

          setTimeout(() => {
            this.showAlert = false;
            this.alertText = '';
          }, 2500);
        }
      });
  }

  toggleShowAppVersion() {
    this.showAppVersion = !this.showAppVersion;
  }

  openModal(modalData: any): void {
    this.modal.open = modalData.open;
    this.modal.header = modalData.header;
    this.modal.body = modalData.body;
    this.modal.callBackFn = modalData.callBackFn;
  }

  closeModal(): void {
    this.modal.open = false;
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
    this.closeModal();
    this.router.navigate(['/']);
  }
}
