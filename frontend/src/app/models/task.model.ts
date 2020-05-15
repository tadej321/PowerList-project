import * as moment from 'moment';
export class Task {
  public id?: string;
  public description: string;
  public completion: boolean;
  public date: moment.Moment;
  public index: number;
  public edit?: boolean;

  constructor(
    id: string,
    description: string,
    completion: boolean,
    date: moment.Moment,
    index: number,
    edit?: boolean
  ) {
    this.id = id;
    this.description = description;
    this.completion = completion;
    this.date = date;
    this.index = index;
    this.edit = edit;
  }
}
