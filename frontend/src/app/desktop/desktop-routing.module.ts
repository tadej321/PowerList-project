import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DesktopComponent} from './desktop.component';
import {TaskListComponent} from './task-list/task-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuard} from '../authentication/auth-guard';

const routes: Routes = [
  {path: 'desktop', component: DesktopComponent, children: [
      {path: 'tasks', component: TaskListComponent, canLoad: [AuthGuard]},
      {path: 'dashboard', component: DashboardComponent, canLoad: [AuthGuard]}
    ], canLoad: [AuthGuard]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DesktopRoutingModule {}
