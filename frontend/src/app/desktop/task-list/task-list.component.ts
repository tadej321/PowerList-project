import {Component, DoCheck, IterableDiffers, OnDestroy, OnInit} from '@angular/core';
import { TaskModel } from '../../models/task.model';
import {TaskService} from './task.service';
import * as moment from 'moment';
import {SortEvent} from '../../directives/sortable-list.directive';
import {Subscription} from 'rxjs';
import {PeriodModel} from "../day-select/period.model";

/**
 * Represents the tab that displays the tasks.
 */

@Component ({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})
 export class TaskListComponent implements OnInit, OnDestroy, DoCheck {
  private taskSub: Subscription;
  tasks: TaskModel[] = [];


  dateString;
  dayString;

  private currentIndex;
  private newIndex;

  private differ: any;
  public displayList = false;
  public period: PeriodModel[] = [];

  constructor(public taskService: TaskService, differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
    this.displayList = false;
    this.taskService.getTasksOfDate(moment());

    const weekStart = moment().startOf('isoWeek');

    for (let i = 0; i <= 6; i++) {
      const date = moment(weekStart).add(i, 'days');
      this.period.push({label: date.format('dddd'), startDate: date});
    }

    this.taskSub = this.taskService.getTaskUpdatedListener()
      .subscribe((taskData: {tasks: TaskModel[]}) => {
        console.log(taskData);
        this.tasks = taskData.tasks;
        this.displayList = true;
      });
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
  }

  /**
   * Requests the addition of a new task
   */
  onAddTask() {
    this.taskService.addTask();
  }

  /**
   *
   * */
  sort(event: SortEvent) {
    const current = this.tasks[event.currentIndex];
    const swapWith = this.tasks[event.newIndex];

    this.currentIndex = event.newIndex;
    this.newIndex = event.currentIndex;

    current.index = event.newIndex;
    swapWith.index = event.currentIndex;

    this.tasks[event.newIndex] = current;
    this.tasks[event.currentIndex] = swapWith;

    this.ngOnDestroy();
  }

  update() {
    if (this.currentIndex && this.newIndex) {
      this.taskService.updateTask(this.tasks[this.currentIndex]);
      this.taskService.updateTask(this.tasks[this.newIndex]);

      this.ngOnInit();
    }
  }

  ngDoCheck(): void {

  }
}
