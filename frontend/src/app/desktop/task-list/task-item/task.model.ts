import * as moment from "moment";

export interface TaskModel {
  id: number;
  description: string;
  completion: boolean;
  date: moment.Moment;
  edit?: boolean;
}

// export class TaskModel {
//   constructor(public description: string, public completion: boolean) {}
// }
