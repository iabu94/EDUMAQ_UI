import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '', 
        component: DashboardComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'academic', 
        loadChildren: () => import('./academic/academic.module').then(m => m.AcademicModule)
      },
      {
        path: 'operation-and-activity', 
        loadChildren: () => import('./operation-and-activity/operation-and-activity.module')
          .then(m => m.OperationAndActivityModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
