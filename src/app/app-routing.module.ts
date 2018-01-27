import { RegisterFormComponent } from './registar/register-form/register-form.component';
import { UserProfilePageComponent } from './registar/user-profile/user-profile-page.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard/dashboard1',
    pathMatch: 'full',
  },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [AuthGuard] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES, canActivate: [AuthGuard] },
  { 
    path: 'login', 
    component: LoginComponent, 
  },
  {
    path : 'notfound',
    component: NotfoundComponent, 
  },
  {
    path : 'registar/register',
    component: RegisterFormComponent, 
  },
  {
    path : 'registar/profile',
    component: UserProfilePageComponent, 
  },
  {
    path : '**',
    redirectTo: '/notfound', 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]  
})

export class AppRoutingModule {
}