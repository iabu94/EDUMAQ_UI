import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BedFareComponent } from './bed-fare/bed-fare.component';
import { CreateHostelComponent } from './create-hostel/create-hostel.component';
import { EmployeeWiseHostelReportComponent } from './employee-wise-hostel-report/employee-wise-hostel-report.component';
import { HostelAttendanceComponent } from './hostel-attendance/hostel-attendance.component';
import { HostelFeeSummaryComponent } from './hostel-fee-summary/hostel-fee-summary.component';
import { HostelPenaltyComponent } from './hostel-penalty/hostel-penalty.component';
import { HostelSettingComponent } from './hostel-setting/hostel-setting.component';
import { HostelSetupComponent } from './hostel-setup/hostel-setup.component';
import { HostelSummaryComponent } from './hostel-summary/hostel-summary.component';
import { ManageWardenComponent } from './manage-warden/manage-warden.component';
import { RoomAllocationComponent } from './room-allocation/room-allocation.component';
import { RoomDeallocationComponent } from './room-deallocation/room-deallocation.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { StudentWiseHostelReportComponent } from './student-wise-hostel-report/student-wise-hostel-report.component';

const routes: Routes = [
  {
    path: 'room-type',
    component: RoomTypeComponent
  },
  {
    path: 'create-hostel',
    component: CreateHostelComponent
  },
  {
    path: 'hostel-setup',
    component: HostelSetupComponent
  },
  {
    path: 'hostel-setting',
    component: HostelSettingComponent
  },
  {
    path: 'bed-fare',
    component: BedFareComponent
  },
  {
    path: 'room-allocation',
    component: RoomAllocationComponent
  },
  {
    path: 'hostel-penalties',
    component: HostelPenaltyComponent
  },
  {
    path: 'hostel-summary',
    component: HostelSummaryComponent
  },
  {
    path: 'room-deallocation',
    component: RoomDeallocationComponent
  },
  {
    path: 'student-wise-hostel-report',
    component: StudentWiseHostelReportComponent
  },
  {
    path: 'employee-wise-hostel-report',
    component: EmployeeWiseHostelReportComponent
  },
  {
    path: 'hostel-attendance',
    component: HostelAttendanceComponent
  },
  {
    path: 'hostel-fee-summary',
    component: HostelFeeSummaryComponent
  },
  {
    path: 'manage-warden',
    component: ManageWardenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationAndActivityRoutingModule { }
