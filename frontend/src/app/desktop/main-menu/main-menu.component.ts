import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {Subscription} from "rxjs";
import { faListAlt, faChartBar, faStar } from '@fortawesome/free-regular-svg-icons';

@Component ({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {

  private authStatusSub: Subscription;
  public userData;
  public listAlt = faListAlt;
  public chartBar = faChartBar;
  public star = faStar;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserCredentials();
    console.log(this.userData);
  }

}
