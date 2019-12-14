import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Output() taskSaved = new EventEmitter<{taskDescription: string}>();
  newTaskDescription;
  constructor() { }

  ngOnInit() {
  }

  // Emit the changes of the edited task.
  onSaveTask() {
    this.taskSaved.emit({
      taskDescription: this.newTaskDescription
    });
  }
}
