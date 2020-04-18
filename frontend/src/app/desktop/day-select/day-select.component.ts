import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList, TemplateRef,
  ViewChildren
} from '@angular/core';
import {TaskService} from '../task-list/task.service';
import * as moment from 'moment';
import * as $ from 'jquery';
import {PeriodModel} from "./period.model";



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

  @Input()
  periods: PeriodModel[] = [];

  @ViewChildren('labelContainer') labelContainer: QueryList<ElementRef>;



  constructor(private taskService: TaskService, private elementRef: ElementRef) {}

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    for (const period of this.periods) {
      if (period.startDate.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        this.toggleDay(this.periods.indexOf(period));
      }
    }
  }

  /**
   * Switches to day of week that was selected.
   *
   * @param selectedPeriod Selected day.
   */
  onDaySelect(selectedPeriod: PeriodModel) {

    for (const period of this.periods) {
      if (period.startDate.format('YYYY-MM-DD') === selectedPeriod.startDate.format('YYYY-MM-DD')) {
        this.toggleDay(this.periods.indexOf(period));
      }
    }

    const endDate = selectedPeriod.endDate ? selectedPeriod.endDate : undefined;

    this.taskService.getTasksOfDate(selectedPeriod.startDate, endDate);
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
