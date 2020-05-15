import {NgModule, Optional, SkipSelf} from '@angular/core';
import {DesktopComponent} from './desktop.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskItemComponent} from './task-list/task-item/task-item.component';
import {DaySelectComponent} from './day-select/day-select.component';
import {BorderHighlightDirective} from '../directives/border-highlight.directive';
import {DraggableDirective} from '../directives/draggable.directive';
import {MovableDirective} from '../directives/movable.directive';
import {MovableAreaDirective} from '../directives/movable-area.directive';
import {DraggableHelperDirective} from '../directives/draggable-helper.directive';
import {SortableListDirective} from '../directives/sortable-list.directive';
import {SortableDirective} from '../directives/sortable.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {DateTimeUtility} from '../shared/date-time.utility';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DashboardComponent} from './dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatInputModule} from '@angular/material/input';
import {DesktopRoutingModule} from "./desktop-routing.module";

@NgModule({
  declarations: [
    DesktopComponent,
    TaskListComponent,
    TaskItemComponent,
    DaySelectComponent,
    BorderHighlightDirective,
    DraggableDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableListDirective,
    SortableDirective,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    FontAwesomeModule,
    NgxChartsModule,
    MatInputModule,
    DesktopRoutingModule
  ],
  providers: [
    DateTimeUtility,
  ],
  exports: [
    DraggableDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableListDirective,
    SortableDirective
  ]
})
export class DesktopModule {
}
