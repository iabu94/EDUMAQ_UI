import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcademicComponent } from './academic/academic.component';

const routes: Routes = [
  {
    path: 'academic', 
    component: AcademicComponent,
    children: [
      {
        path: 'mastersettings', 
        loadChildren: () => import('./mastersettings/mastersettings.module').then(m => m.MastersettingsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademicRoutingModule { }
