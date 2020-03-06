import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})

export class DesktopComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(() => {
    });
  }
}
