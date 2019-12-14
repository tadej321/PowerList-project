import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})

export class TaskItemComponent implements OnInit {
  @Input() task: {description: string, completion: boolean, count: number, edit: boolean};
  @Output() editedTask = new EventEmitter<{editedTaskCount: number}>();
  constructor() {}

  ngOnInit() {
  }

  // Emit the count of the task to be edited.
  onTaskEdit() {
    this.editedTask.emit({
      editedTaskCount: this.task.count
    });
  }
}
