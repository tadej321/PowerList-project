import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  // @Output() taskSaved = new EventEmitter<{taskDescription: string}>();
  @Input() taskCount: number;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
  }


  // Emit the changes of the edited task.
  onSaveTask(descriptionInput: HTMLInputElement) {
    this.taskService.saveTask(descriptionInput.value, this.taskCount);
    // this.taskSaved.emit({
    //   taskDescription: descriptionInput.value
    // });
  }
}
