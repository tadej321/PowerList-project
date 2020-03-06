import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DesktopComponent} from './desktop/desktop.component';
import {AuthGuard} from './authentication/auth-guard';

const routes: Routes = [
  {path: 'auth', loadChildren: './authentication/auth.module#AuthModule'},
  {path: '', component: DesktopComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
