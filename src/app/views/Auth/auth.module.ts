import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import(`./login/login.module`).then(
      module => module.LoginModule
    )
  },
  {
    path: 'register-now',
    loadChildren: () => import(`./register/register.module`).then(
      module => module.RegisterModule
    )
  },
  {
    path: 'forgot-password',
    loadChildren: () => import(`./forgot-password/forgot-password.module`).then(
      module => module.ForgotPasswordModule
    )
  }
];

@NgModule({
  declarations: [
    // RegisterComponent
  
    // ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthModule { }
