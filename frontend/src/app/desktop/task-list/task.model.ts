import * as moment from "moment";

export interface TaskModel {
  id: string;
  description: string;
  completion: boolean;
  date: string;
  edit?: boolean;
}
