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
  private userData;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.authService.getUserCredentials();
    console.log(this.userData);
  }

}
