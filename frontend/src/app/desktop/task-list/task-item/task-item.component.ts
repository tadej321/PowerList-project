import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {TaskService} from '../task.service';
import {TaskModel} from '../../../models/task.model';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * Represents the task.
 */

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})

export class TaskItemComponent implements OnInit {
  @Input() task: TaskModel;
  @Input() index: number;

  public remove = faTimes;

  constructor(public taskService: TaskService) {
  }

  ngOnInit() {
  }

  /**
   * Requests to change the state of the task to editable
   */
  onTaskEdit() {
    this.taskService.editTask(this.task.id);
  }

  /**
   * Requests the removal of the task
   */
  onTaskRemove() {
    this.taskService.removeTask(this.task.id);
  }

  /**
   * Requests the update of the tasks checkbox state
   */
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
