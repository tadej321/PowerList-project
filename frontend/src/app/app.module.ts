import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './header/menu/menu.component';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {DesktopComponent} from './desktop/desktop.component';
import {TaskListComponent} from './desktop/task-list/task-list.component';
import {TaskItemComponent} from './desktop/task-list/task-item/task-item.component';
import {FooterComponent} from './desktop/task-list/footer/footer.component';
import { TaskEditComponent } from './desktop/task-list/task-edit/task-edit.component';
import {FormsModule} from '@angular/forms';
import {BorderHighlightDirective} from './directives/border-highlight.directive';
import {DateTimeUtility} from './shared/date-time.utility';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DraggableDirective} from './directives/draggable.directive';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    MainMenuComponent,
    DesktopComponent,
    TaskListComponent,
    TaskItemComponent,
    FooterComponent,
    TaskEditComponent,
    TaskEditComponent,
    BorderHighlightDirective,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [DateTimeUtility],
  bootstrap: [AppComponent],

})

export class AppModule {}
