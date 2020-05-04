import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DesktopComponent} from "./desktop.component";
import {TaskListComponent} from "./task-list/task-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: 'desktop', component: DesktopComponent, children: [
      {path: 'tasks', component: TaskListComponent},
      {path: 'dashboard', component: DashboardComponent}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DesktopRoutingModule {}
