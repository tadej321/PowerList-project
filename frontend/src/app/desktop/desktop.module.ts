import {NgModule} from '@angular/core';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {DesktopComponent} from './desktop.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskItemComponent} from './task-list/task-item/task-item.component';
import {DaySelectComponent} from './task-list/day-select/day-select.component';
import {TaskEditComponent} from './task-list/task-edit/task-edit.component';
import {BorderHighlightDirective} from '../directives/border-highlight.directive';
import {DraggableDirective} from '../directives/draggable.directive';
import {MovableDirective} from '../directives/movable.directive';
import {MovableAreaDirective} from '../directives/movable-area.directive';
import {DraggableHelperDirective} from '../directives/draggable-helper.directive';
import {SortableListDirective} from '../directives/sortable-list.directive';
import {SortableDirective} from '../directives/sortable.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {OverlayModule} from '@angular/cdk/overlay';
import {DateTimeUtility} from '../shared/date-time.utility';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    MainMenuComponent,
    DesktopComponent,
    TaskListComponent,
    TaskItemComponent,
    DaySelectComponent,
    TaskEditComponent,
    TaskEditComponent,
    BorderHighlightDirective,
    DraggableDirective,
    MovableDirective,
    MovableAreaDirective,
    DraggableHelperDirective,
    SortableListDirective,
    SortableDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule,
    OverlayModule,
    FontAwesomeModule,
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
export class DesktopModule {}
