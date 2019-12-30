import * as moment from 'moment';
const now = moment().format('LL');
const yesterday = moment().format('LL');
export class TaskService {
  taskArray = [
    {description: '45 minute workout', completion: false, id: 1, edit: false, date: now},
    {description: 'Wake up at 5:00am', completion: false, id: 2, edit: false, date: now},
    {description: 'read 10 pages', completion: false, id: 3, edit: false, date: now},
    {description: 'drink 1 gallon of water', completion: false, id: 4, edit: false, date: now},
    {description: '45 minute workout', completion: false, id: 1, edit: false, date: now.subtract(1, 'days')},
    {description: 'Wake up at 5:00am', completion: false, id: 2, edit: false, date: new Date()},
    {description: 'read 10 pages', completion: false, id: 3, edit: false, date: new Date()},
    {description: 'drink 1 gallon of water', completion: false, id: 4, edit: false, date: new Date()}
  ];

// Save changes of an edited task to the array
  saveTask(newDescription: string, id: number) {
    // Leave the current description if new wasn't provided
    if (newDescription !== '') {
      this.taskArray[id - 1].description = newDescription;
    }
    this.taskArray[id - 1].edit = false;
  }

// Change to edit mode of an task item
  editTask(editedTaskId: number) {
      this.taskArray[editedTaskId - 1].edit = true;
  }

// Change the state of the checkbox to checked or to unchecked.
  changeCheckboxState(editedTaskCount: number) {
    this.taskArray[editedTaskCount - 1].completion = !this.taskArray[editedTaskCount - 1].completion;
  }

// Remove the task from the array.
  removeTask(taskId: number) {
    this.taskArray.splice(taskId - 1, 1);

    let id = 1;
    for (const task of this.taskArray) {
      task.id = id;
      id ++;
    }
  }

// Add a new task to the array
  addTask() {
    this.taskArray.push({
      description: '',
      completion: false,
      id: this.taskArray.length + 1,
      edit: true,
      date: new Date()
    });
  }

  changeDay() {

  }

}
