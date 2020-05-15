import * as TaskListActions from '../actions/task-list.actions';
import * as moment from "moment";
import {Task} from "../../models/task.model";

const initialState = {
  tasks: [
    new Task('asd79d698a7sd', 'Task 1', false, moment(), 0, false)
  ]
};

export function taskListReducer(state = initialState, action: TaskListActions.AddTask) {
  switch (action.type) {
    case TaskListActions.ADD_TASK:
      return {...state, tasks: [...state.tasks, action.payload]};
    default:
      return state;
  }
}
