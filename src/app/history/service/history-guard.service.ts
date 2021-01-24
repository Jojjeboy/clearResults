import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { TallyService } from 'src/app/tally/service/tally.service';
import { Tally } from '../../tally/types/Tally';

@Injectable({
  providedIn: 'root'
})
export class HistoryGuardService implements CanActivate {

  tallyObservable!: Subscription;

  constructor(private tallyService: TallyService, private router: Router, private route: ActivatedRoute) {

  }

  canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let resetEveryDay: boolean = false;
    this.tallyObservable = this.tallyService.getTallyById(activatedRouteSnapshot.params.id).subscribe(tally => {
      resetEveryDay = tally.getResetEveryday();
    });
    console.log('Can access', resetEveryDay);
    return resetEveryDay;
  }
}
