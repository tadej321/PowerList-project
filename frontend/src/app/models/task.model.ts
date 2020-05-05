import * as moment from 'moment';
export interface TaskModel {
  id: string;
  description: string;
  completion: boolean;
  date: moment.Moment;
  edit?: boolean;
  index: number;
}
