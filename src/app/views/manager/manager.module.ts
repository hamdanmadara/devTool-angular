import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    // canActivate: [AuthGuard],

    children: [
      // { path: '', redirectTo: 'manager1', pathMatch: 'full' },
      {
        path: 'manager-dashboard',
        loadChildren: () => import(`./manager-dashboard/manager-dashboard.module`).then(
          module => module.ManagerDashboardModule
        )
      }
    ]

  },
 
    

];

@NgModule({
  declarations: [ManagerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ManagerModule { }
