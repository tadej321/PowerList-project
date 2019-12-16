import {Component, Input, OnInit} from '@angular/core';
import { TaskModel } from './task-item/task.model';

@Component ({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
 export class TaskListComponent implements OnInit {
  edit = false;
  taskArray = [
    {description: '45 minute workout', completion: false, count: 1, edit: false},
    {description: 'Wake up at 5:00am', completion: false, count: 2, edit: false},
    {description: 'read 10 pages', completion: false, count: 3, edit: false},
    {description: 'drink 1 gallon of water', completion: false, count: 4, edit: false}
  ];

  constructor() {}

  ngOnInit() {
  }
 // Save changes of an edited task to the array
  onTaskSaved(newTask: {newDescription: string, count: number}) {
    // Leave the current description if new wasn't provided
    if (newTask.newDescription !== '') {
      this.taskArray[newTask.count - 1].description = newTask.newDescription;
    }
    this.taskArray[newTask.count - 1].edit = false;
  }
// Change to edit mode of an task item
  onTaskEdited(editObj) {
    if (editObj.action === 'edit') {
      this.taskArray[editObj.editedTaskCount - 1].edit = true;
    } else if (editObj.action === 'remove') {
      this.taskArray.splice(editObj.editedTaskCount - 1, 1);

      let currentTaskCount = 1;
      for (const task of this.taskArray) {
        task.count = currentTaskCount;
        currentTaskCount ++;
      }
    } else if (editObj.action === 'check') {
      this.taskArray[editObj.editedTaskCount - 1].completion = !this.taskArray[editObj.editedTaskCount - 1].completion;
    }
  }
// Add a new task to the array
  onTaskAdded() {
    this.taskArray.push({
      description: '',
      completion: false,
      count: this.taskArray.length + 1,
      edit: true
    });

  }
}
