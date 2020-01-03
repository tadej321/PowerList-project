import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {DateTimeUtility} from '../../../shared/date-time.utility';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {
  currentDay = new Date();

  days: ReadonlyArray<string> = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    const dateTimeUtility = new DateTimeUtility();
    this.days = dateTimeUtility.getWeekDayArray();
  }

  onDaySelected(selectedDay: string) {
    this.taskService.changeDay();
  }
}
