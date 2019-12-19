import {Component, Input, OnInit} from '@angular/core';
import { TaskModel } from './task-item/task.model';
import {TaskService} from './task.service';

@Component ({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService]
})
 export class TaskListComponent implements OnInit {
  tasks: {description: string, completion: boolean, id: number, edit: boolean}[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasks = this.taskService.taskArray;
  }

  onAddTask() {
    this.taskService.addTask();
  }
}
