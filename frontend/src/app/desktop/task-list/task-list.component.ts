import {Component, DoCheck, IterableDiffers, OnDestroy, OnInit} from '@angular/core';
import { TaskModel } from './task.model';
import {TaskService} from './task.service';
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
