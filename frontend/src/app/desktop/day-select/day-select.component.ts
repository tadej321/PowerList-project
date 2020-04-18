import {AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {TaskService} from '../task-list/task.service';
import * as moment from 'moment';
import * as $ from 'jquery';

/**
 * Represents the row of buttons used for switching between days of the week
 */

@Component({
  selector: 'app-day-select',
  templateUrl: './day-select.component.html',
  styleUrls: ['./day-select.component.css']
})

export class DaySelectComponent implements OnInit, AfterViewInit {
  currentDay = new Date();
  currentDate = moment();

  days: Array<string> = [];
  @ViewChildren('labelContainer') labelContainer: QueryList<ElementRef>;

  constructor(private taskService: TaskService, private elementRef: ElementRef) {}

  ngOnInit() {

    const weekStart = this.currentDate.clone().startOf('isoWeek');

    for (let i = 0; i <= 6; i++) {
      this.days.push(moment(weekStart).add(i, 'days').format('dddd,YYYY-MM-DD'));
    }

  }

  ngAfterViewInit(): void {
    const index = this.days.indexOf(moment().format('dddd,YYYY-MM-DD'));

    this.toggleDay(index);
  }

  /**
   * Switches to day of week that was selected.
   *
   * @param selectedDay Selected day.
   * */
  onDaySelect(selectedDay: string) {
    const index = this.days.indexOf(selectedDay);

    this.toggleDay(index);

    const date = this.days[index].split(',', 2);

    this.taskService.getTasksOfDate(moment(date[1]));
  }

  /**
   * sets the button state to toggled depending on the day selected.
   *
   * @param index Index of the selected day in the week.
   */
  toggleDay(index: number) {

    this.labelContainer.forEach(container => {

      const labels = container.nativeElement.children;

      for (const label of labels) {
        label.classList.remove('toggled');
      }

      labels[index].classList.add('toggled');
    });

  }
}
