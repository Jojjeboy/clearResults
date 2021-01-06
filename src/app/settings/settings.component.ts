import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  showAll: boolean = true;
  constructor(private localStorageService: LocalStorageService) {
    
  }

  ngOnInit(): void {
  }

   // Update show all
   eventCheck(event: any){
    let config = this.localStorageService.getConfig();
    this.showAll = event.target.checked;
    config.showAll = this.showAll;
    this.localStorageService.saveConfig(config);
  }

}
