import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {AuthService} from '../authentication/auth.service';
import {Subscription} from 'rxjs';
import {faChartBar, faListAlt, faStar} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})

export class DesktopComponent implements OnInit {

  private authStatusSub: Subscription;
  public userData;
  public listAlt = faListAlt;
  public chartBar = faChartBar;
  public star = faStar;

  public showTab = 'tasks';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
    });

    this.userData = this.authService.getUserCredentials();
  }

  onTabSwitch(tab: string) {
    this.showTab = tab;
  }

}
