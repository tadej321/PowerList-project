import {NgModule} from '@angular/core';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {DesktopComponent} from './desktop.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskItemComponent} from './task-list/task-item/task-item.component';
import {FooterComponent} from './task-list/footer/footer.component';
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

@NgModule({
  declarations: [
    MainMenuComponent,
    DesktopComponent,
    TaskListComponent,
    TaskItemComponent,
    FooterComponent,
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