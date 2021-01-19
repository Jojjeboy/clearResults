import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gitlog } from '../classes/Gitlog';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-git-log',
  templateUrl: './git-log.component.html',
  styleUrls: ['./git-log.component.scss']
})
export class GitLogComponent implements OnInit, OnDestroy {

  gitLogObservable!: Subscription;
  gitLogs: Gitlog[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.gitLogObservable = this.httpService.getGitLog().subscribe(gitLogsObjects => {
      gitLogsObjects.forEach(logs => {
        const gitLog = new Gitlog(logs);
        this.gitLogs.push(gitLog);
      });


    });

  }

  ngOnDestroy(): void {
    this.gitLogObservable.unsubscribe();
  }

}
