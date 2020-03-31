import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {DateTimeUtility} from '../../../shared/date-time.utility';
import * as moment from 'moment';


@Component({
  selector: 'app-day-select',
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.css']
})

export class DaySelectComponent implements OnInit {
  currentDay = new Date();
  currentDate = moment();

  days: Array<string> = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    const dateTimeUtility = new DateTimeUtility();

    const weekStart = this.currentDate.clone().startOf('isoWeek');
    const weekEnd = this.currentDate.clone().endOf('isoWeek');

    for (let i = 0; i <= 6; i++) {
      this.days.push(moment(weekStart).add(i, 'days').format('dddd,YYYY-MM-DD'));
    }
  }

  onDaySelected(selectedDay: string) {
    ($('.btn.dark') as any).button('toggle');

    const index = this.days.indexOf(selectedDay);

    const date = this.days[index].split(',', 2);

    this.taskService.getTasksOfDay(date[1]);
  }
}
