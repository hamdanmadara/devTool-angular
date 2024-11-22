import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./views/Auth/auth.module`).then(
      module => module.AuthModule
    )
  },
  {
    path: 'manager',
    loadChildren: () => import(`./views/manager/manager.module`).then(
      module => module.ManagerModule
    )
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
