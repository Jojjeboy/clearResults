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

    const userReferedHere: boolean = this.router.url.split('/').length === 3;

    //if(!userReferedHere){
      this.router.navigate(['/tally/' + activatedRouteSnapshot.params.id], { queryParams: { type: 'danger', message: 'Du har inte tillåtelse att redigera historiken!' } });
    //}

    //console.log(userReferedHere);
    //console.log('Can access', resetEveryDay);
    return resetEveryDay;

    /*
      1. Om (this.reuter.url) är: / Då har vi försökt laddat url:en direkt
      2 Annars kommer vi från 
      
      
      0891cc48-798d-9f8d-010c-14b2frc43416

    */
  }
}
