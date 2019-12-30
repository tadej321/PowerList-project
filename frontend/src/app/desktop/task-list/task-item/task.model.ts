export interface TaskModel {
  id: number;
  description: string;
  completion: boolean;
  date: Date;
  edit?: boolean;
}

// export class TaskModel {
//   constructor(public description: string, public completion: boolean) {}
// }
