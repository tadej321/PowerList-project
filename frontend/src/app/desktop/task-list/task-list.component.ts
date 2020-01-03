import {Component, Input, OnInit} from '@angular/core';
import { TaskModel } from './task-item/task.model';
import {TaskService} from './task.service';
import {DateTimeUtility} from '../../shared/date-time.utility';
import * as moment from 'moment';



@Component ({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})
 export class TaskListComponent implements OnInit {
  tasks: TaskModel[] = [];


  dateString;
  dayString;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    const dateTimeUtility = new DateTimeUtility();


    this.tasks = moment(this.taskService.taskArray[0].date).format('LL') === moment().format('LL') ? this.taskService.taskArray : [];

    this.dateString = this.tasks === [] ? moment().format('LL') : this.tasks[0].date.format('LL');
    this.dayString = this.tasks === [] ? moment().format('dddd') : this.tasks[0].date.format('dddd');


  }

  onAddTask() {
    this.taskService.addTask();
  }
}
