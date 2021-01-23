import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './shared/service/local-storage/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { applicationversion } from '../environments/applicationversion';
import { DatePipe } from '@angular/common';

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

  clearCacheModal: Object = {};
  

  constructor(private localStorageService: LocalStorageService,
    private route: ActivatedRoute, private router: Router, private datePipe: DatePipe) {
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

  clearCache() {
    this.clearCacheModal = {
      open: true,
      header: 'Radera Local Storage',
      body: 'Är du säker på att du vill radera all Local Storage',
    }
  }

  clearCacheConfirmed() {
    this.localStorageService.clear();
    this.clearCacheModal = { open: false }
    this.router.navigate(['/']);
  }

}
