import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MastersettingsComponent } from './mastersettings/mastersettings.component';
import { AcademicyearComponent } from './academicyear/academicyear.component';

const routes: Routes = [
    {path: 'mastersettings', component: MastersettingsComponent},
    {path: 'mastersettings/academicyear', component: AcademicyearComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSettingsRoutingModule { }
