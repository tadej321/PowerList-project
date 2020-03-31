import * as moment from 'moment';
import {TaskModel} from './task.model';
import {HttpClient} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {environment} from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/task/';
const BACKEND_USER_URL = environment.apiUrl + '/user/';

/** @class TaskService with functions shared between components */

@Injectable({providedIn: 'root'})
export class TaskService {
  /**
   * Houses functions that are used by multiple components, as well as task API functions.
   *
   * @constructor
   */

  private tasks: TaskModel[] = [];
  private tasksUpdated = new Subject<{tasks: TaskModel[]}>();



  constructor(
    private http: HttpClient,
    private router: RouterModule
  ) {}

  /**
   * Fetches tasks of a certain date from the database
   *
   * @param date Formatted date string of the desired date
   * @returns Array of tasks with all their information
   */
  getTasksOfDay(date: string) {
    this.http.get<{message: string, tasks: any}>(
      BACKEND_URL + date
    )
      .pipe(map((taskData) => {
        return { tasks: taskData.tasks.map(task => {
          return {
            id: task._id,
            description: task.description,
            date: task.date,
            completion: task.completion,
            edit: false,
            index: task.index
          };
          })};
    }))
      .subscribe((transformedTaskData) => {
        this.tasks = transformedTaskData.tasks.sort((a, b) => (a.index > b.index) ? 1 : -1);
        this.tasksUpdated.next({tasks: [...this.tasks]});
      });
  }
  /**
   * Returns the tasksUpdated Subject as an observable
   *
   * @returns tasksUpdated Observable
   */
  getTaskUpdatedListener() {
    return this.tasksUpdated.asObservable();
  }

/**
 * Calls the put API, and provides the updated information.
 * Also updates the tasks array.
 *
 * @param updatedTask object holding the updated information of the task
 */
  updateTask(updatedTask: TaskModel) {

    const taskData: TaskModel = {
      id: updatedTask.id,
      description: updatedTask.description,
      completion: updatedTask.completion,
      date: updatedTask.date,
      index: updatedTask.index
    };

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
            edit: false,
            index:  updatedTask.index
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


  /**
   * Changes the state of the edit field of a certain task.
   *
   * @param editedTaskId Unique id of the task
   */
  editTask(editedTaskId: string) {
    const updatedTasks = [...this.tasks];
    const taskIndex = updatedTasks.findIndex(i => i.id === editedTaskId);
    updatedTasks[taskIndex].edit = true;
    this.tasks = updatedTasks;
    this.tasksUpdated.next({tasks: [...this.tasks]});
  }

  /**
   * Takes an id of the task and calls the delete API with the id as a router param.
   * Also removes the task from the tasks array.
   *
   * @param id Unique id of the task
   */
  removeTask(id: string) {
    this.http.delete<{message: string}>(BACKEND_URL + id)
    .subscribe(response => {
      const updatedTasks = [...this.tasks];
      const taskIndex = updatedTasks.findIndex(i => i.id === id);
      updatedTasks.splice(taskIndex, 1);

      for (let i = 0; i < updatedTasks.length; i++) {
        updatedTasks[i].index = i;
      }
      console.log(updatedTasks);
      this.tasks = updatedTasks;
      this.tasksUpdated.next({tasks: [...this.tasks]});
    });


  }

  /**
   * Creates a new task and calls the post API providing the new task information
   * Also add the task to the tasks array
   */
  addTask() {
    const taskData = {
      description: '',
      completion: false,
      date: moment().format('YYYY-MM-DD'),
      index: this.tasks.length
    };
    console.log(taskData);
    this.http.post<{message: string, task: TaskModel}>(
      BACKEND_URL,
      taskData
    ).subscribe((response) => {
      const task: TaskModel = {
        id: response.task.id,
        description: '',
        completion: false,
        edit: true,
        date: response.task.date,
        index: this.tasks.length
      };
      this.tasks.push(task);

      this.tasksUpdated.next({tasks: [...this.tasks]});
    });
  }

  changeDay(day: string) {
    console.log(day);
  }

}
