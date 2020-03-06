import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../authentication/auth.service";
import {Subscription} from "rxjs";

@Component ({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})

export class MainMenuComponent implements OnInit {

  private authStatusSub: Subscription;
  private name;
  private surname;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.name = this.authService.getUserCredentials().name;
    // this.surname = this.authService.getUserCredentials().surname;
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe();
  }

}
