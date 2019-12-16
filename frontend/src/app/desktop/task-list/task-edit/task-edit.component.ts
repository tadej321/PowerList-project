import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  @Output() taskSaved = new EventEmitter<{taskDescription: string}>();

  constructor() { }

  ngOnInit() {
  }


  // Emit the changes of the edited task.
  onSaveTask(descriptionInput: HTMLInputElement) {
    this.taskSaved.emit({
      taskDescription: descriptionInput.value
    });
  }
}
