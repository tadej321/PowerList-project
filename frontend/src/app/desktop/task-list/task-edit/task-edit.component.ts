import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TaskService} from '../task.service';
import {TaskModel} from '../../../models/task.model';

/**
 * Represents a task in it's editable state.
 * */

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  // @Output() taskSaved = new EventEmitter<{taskDescription: string}>();
  @Input() taskCount: number;
  @Input() task: TaskModel;

  constructor(public taskService: TaskService) {}

  ngOnInit() {
  }

  /**
   * Sends the updated information for saving.
   *
   * @param descriptionInput New task description.
   */
  onSaveTask(descriptionInput: HTMLInputElement) {
    const task: TaskModel = {
      id: this.task.id,
      description: descriptionInput.value,
      completion: this.task.completion,
      date: this.task.date,
      index: this.task.index
    };
    this.taskService.updateTask(task);
  }
}
