import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Subscription} from 'rxjs';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {

  private authStatusSub: Subscription;
  public correctPassword;
  public correctEmail;

  constructor(public authService: AuthService) {}

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.correctEmail = true;
    this.correctPassword = true;
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe();
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (!form.value.password) {
      this.correctPassword = false;
      return;
    }

    this.authService.login(form.value.email, form.value.password).catch(e => {
      if (e.error.message === 'Auth failed, password not found') {
        this.correctPassword = false;
      } else if (e.error.message === 'Auth failed, email not found') {
        this.correctEmail = false;
      }
    });
  }

  onFocus() {
    this.correctPassword = true;
    this.correctEmail = true;
  }

}
