import * as moment from 'moment';
import {TaskModel} from './task.model';
import {HttpClient} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment";

const BACKEND_URL = environment.apiUrl + '/task';

const now = moment();
@Injectable({providedIn: 'root'})
export class TaskService {

  private tasks: TaskModel[] = [];
  private tasksUpdated = new Subject<{tasks: TaskModel[]}>();

  constructor(private http: HttpClient, private router: RouterModule) {}

  getTasksOfDay(date: string) {
    this.http.get<{message: string, tasks: any}>(
      BACKEND_URL + '/' + date
    )
      .pipe(map((taskData) => {
        return { tasks: taskData.tasks.map(task => {
          return {
            id: task._id,
            description: task.description,
            date: task.date,
            completion: task.completion,
            edit: false
          };
          })};
    }))
      .subscribe((transformedTaskData) => {
        this.tasks = transformedTaskData.tasks;
        this.tasksUpdated.next({tasks: [...this.tasks]});
      });
  }

  getTaskUpdatedListener() {
    return this.tasksUpdated.asObservable();
  }

// Save changes of an edited task to the array
  updateTask(updatedTask: TaskModel) {
    const taskData: TaskModel = {
      id: updatedTask.id,
      description: updatedTask.description,
      completion: updatedTask.completion,
      date: updatedTask.date
    };
    console.log(taskData);
    // Leave the current description if new wasn't provided
    if (updatedTask.description !== '') {
      this.http.put(BACKEND_URL, taskData)
        .subscribe(response => {
          const updatedTasks = [...this.tasks];
          const oldTaskIndex = updatedTasks.findIndex(i => i.id === updatedTask.id);
          updatedTasks[oldTaskIndex] = {
            id: updatedTask.id,
            description: updatedTask.description,
            completion: updatedTask.completion,
            date: updatedTask.date,
            edit: false
          };
          this.tasks = updatedTasks;
          this.tasksUpdated.next({tasks: [...this.tasks]});
        });
    } else {
      const updatedTasks = [...this.tasks];
      const oldTaskIndex = updatedTasks.findIndex(i => i.id === updatedTask.id);
      updatedTasks[oldTaskIndex].edit = false;
      this.tasks = updatedTasks;
      this.tasksUpdated.next({tasks: [...this.tasks]});
    }
  }

// Change to edit mode of an task item
  editTask(editedTaskId: string) {
    const updatedTasks = [...this.tasks];
    const taskIndex = updatedTasks.findIndex(i => i.id === editedTaskId);
    updatedTasks[taskIndex].edit = true;
    this.tasks = updatedTasks;
    this.tasksUpdated.next({tasks: [...this.tasks]});
  }

// Change the state of the checkbox to checked or to unchecked.

// Remove the task from the array.
  removeTask(id: string) {
    this.http.delete<{message: string}>(BACKEND_URL + id)
    .subscribe(response => {
      const updatedTasks = [...this.tasks];
      const taskIndex = updatedTasks.findIndex(i => i.id === id);
      updatedTasks.splice(taskIndex, 1);
      this.tasks = updatedTasks;
      this.tasksUpdated.next({tasks: [...this.tasks]});
    });


  }

// Add a new task to the array
  addTask() {
    const taskData = {
      description: '',
      completion: false,
      date: moment().format('YYYY-MM-DD')
    };

    this.http.post<{message: string, task: TaskModel}>(
      BACKEND_URL,
      taskData
    ).subscribe((response) => {
      const task: TaskModel = {
        id: response.task.id,
        description: '',
        completion: false,
        edit: true,
        date: response.task.date
      };
      this.tasks.push(task);

      this.tasksUpdated.next({tasks: [...this.tasks]});
    });
  }

  changeDay() {

  }

}
