import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clearResults';

  constructor(private localStorageService: LocalStorageService) {
    this.localStorageService.init(this.title);
    //console.log(VERSION);
  }
}
