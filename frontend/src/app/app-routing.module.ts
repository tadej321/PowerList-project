import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {DesktopComponent} from './desktop/desktop.component';
import {AuthGuard} from "./authentication/auth-guard";

const routes: Routes = [
  {path: '', loadChildren: './authentication/auth.module#AuthModule'},
  {path: 'desktop', component: DesktopComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
