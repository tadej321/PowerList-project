import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TaskService} from '../task.service';
import {TaskModel} from '../task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})

export class TaskItemComponent implements OnInit {
  @Input() task: TaskModel;
  @Input() index: number;
  constructor(public taskService: TaskService) {
  }

  ngOnInit() {
  }

  // Call change to edit mode method
  onTaskEdit() {
    console.log(this.task.id);
    this.taskService.editTask(this.task.id);
  }

  // Call remove task method
  onTaskRemove() {
    this.taskService.removeTask(this.task.id);
  }

  // Call update task method
  onCheckboxChange() {
    const task: TaskModel = {
      id: this.task.id,
      description: this.task.description,
      completion: !this.task.completion,
      date: this.task.date,
      index: this.task.index
    };
    this.taskService.updateTask(task);
  }
}
