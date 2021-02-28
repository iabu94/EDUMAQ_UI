import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AcademicModule } from './academic/academic.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OperationAndActivityModule } from './operation-and-activity/operation-and-activity.module';

@NgModule({
  declarations: [DashboardComponent, AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AcademicModule,
    OperationAndActivityModule
  ]
})
export class AdminModule { }
