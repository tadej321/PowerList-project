import * as moment from 'moment';

export interface PeriodModel {
  label: string;
  startDate: moment.Moment;
  endDate?: moment.Moment;
}
