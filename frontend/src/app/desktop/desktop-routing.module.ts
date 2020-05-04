import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DesktopComponent} from "./desktop.component";
import {TaskListComponent} from "./task-list/task-list.component";

const routes: Routes = [
  {path: 'desktop', component: DesktopComponent, children: [
      {path: 'tasks', component: TaskListComponent}
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DesktopRoutingModule {}
