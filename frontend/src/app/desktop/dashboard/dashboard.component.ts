import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../task-list/task.service';
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import {TaskModel} from '../task-list/task.model';
import {map} from 'rxjs/operators';
import {PeriodModel} from '../day-select/period.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit, OnDestroy {

  private taskSub: Subscription;
  tasks = [];

  single: any[];

  view: any[] = [700, 400];
  // options
  gradient = true;
  showLegend = true;
  showLabels = true;

  isDoughnut = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28']
  };


  public period: PeriodModel[] = [
    {
      label: 'This Week',
      startDate: moment().day(1),
      endDate: moment().day(7)
    },
    {
      label: 'This Month',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    },
    {
      label: 'This Year',
      startDate: moment().startOf('year'),
      endDate: moment().endOf('year')
    }
  ];

  public data = [{name: 'completed', value: 0}, {name: 'failed', value: 0}];

  constructor(public taskService: TaskService) {

  }

  ngOnInit(): void {

    this.taskSub = this.taskService.getTaskUpdatedListener()
      .pipe( map(taskData => {
        return this.formatData(taskData.tasks);
    }))
      .subscribe(formattedData => {
        this.tasks = formattedData;
      });

  }

  ngOnDestroy(): void {
    this.taskSub.unsubscribe();
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  formatData(taskData: TaskModel[]) {
    const formattedData = [{name: 'complete', value: 0}, {name: 'failed', value: 0}];
    for (const task of taskData) {
      if (task.completion === true ) {
        formattedData[0].value += 1;
      } else {
        formattedData[1].value += 1;
      }
    }
    return formattedData;
  }
}
