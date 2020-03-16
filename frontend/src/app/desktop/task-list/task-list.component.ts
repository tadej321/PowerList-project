import {Component, DoCheck, IterableDiffers, OnDestroy, OnInit} from '@angular/core';
import { TaskModel } from './task.model';
import {TaskService} from './task.service';
import {DateTimeUtility} from '../../shared/date-time.utility';
import * as moment from 'moment';
import {SortEvent} from '../../directives/sortable-list.directive';
import {Subscription} from 'rxjs';



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

  private curentIndex;
  private newIndex;

  private differ: any;
  public displayList = false;

  constructor(public taskService: TaskService, differs: IterableDiffers) {
    this.differ = differs.find([]).create(null);
  }

  ngOnInit() {
    this.displayList = false;
    this.taskService.getTasksOfDay(moment().format('YYYY-MM-DD'));
    this.taskSub = this.taskService.getTaskUpdatedListener()
      .subscribe((taskData: {tasks: TaskModel[]}) => {
        this.tasks = taskData.tasks;
        this.displayList = true;
      });

    const dateTimeUtility = new DateTimeUtility();

    // if (this.taskService.taskArray.length !== 0) {
    //   this.tasks = moment(this.taskService.taskArray[0].date).format('LL') === moment().format('LL') ? this.taskService.taskArray : [];
    // }

    // this.dateString = this.tasks === [] ? moment().format('LL') : this.tasks[0].date.format('LL');
    // this.dayString = this.tasks === [] ? moment().format('dddd') : this.tasks[0].date.format('dddd');
  }

  ngOnDestroy() {
    this.taskSub.unsubscribe();
  }


  onAddTask() {
    this.taskService.addTask();
  }

  sort(event: SortEvent) {
    const current = this.tasks[event.currentIndex];
    const swapWith = this.tasks[event.newIndex];

    this.curentIndex = event.newIndex;
    this.newIndex = event.currentIndex;

    current.index = event.newIndex;
    swapWith.index = event.currentIndex;

    this.tasks[event.newIndex] = current;
    this.tasks[event.currentIndex] = swapWith;

    this.ngOnDestroy();
  }

  update() {
    if (this.curentIndex && this.newIndex) {
      this.taskService.updateTask(this.tasks[this.curentIndex]);
      this.taskService.updateTask(this.tasks[this.newIndex]);

      this.ngOnInit();
    }
  }

  ngDoCheck(): void {

  }
}
