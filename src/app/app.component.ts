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

  constructor(private localStorageService: LocalStorageService,
    private route: ActivatedRoute) {
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
}
