import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BedFareComponent } from './bed-fare/bed-fare.component';
import { CreateHostelComponent } from './create-hostel/create-hostel.component';
import { HostelPenaltyComponent } from './hostel-penalty/hostel-penalty.component';
import { HostelSettingComponent } from './hostel-setting/hostel-setting.component';
import { HostelSetupComponent } from './hostel-setup/hostel-setup.component';
import { HostelSummaryComponent } from './hostel-summary/hostel-summary.component';
import { OperationAndActivityRoutingModule } from './operation-and-activity-routing.module';
import { PIPES } from './pipes';
import { RoomAllocationComponent } from './room-allocation/room-allocation.component';
import { RoomDeallocationComponent } from './room-deallocation/room-deallocation.component';
import { RoomTypeComponent } from './room-type/room-type.component';
import { StudentWiseHostelReportComponent } from './student-wise-hostel-report/student-wise-hostel-report.component';
import { EmployeeWiseHostelReportComponent } from './employee-wise-hostel-report/employee-wise-hostel-report.component';
import { HostelAttendanceComponent } from './hostel-attendance/hostel-attendance.component';
import { HostelFeeSummaryComponent } from './hostel-fee-summary/hostel-fee-summary.component';
import { ManageWardenComponent } from './manage-warden/manage-warden.component';

@NgModule({
  declarations: [
    RoomTypeComponent,
    CreateHostelComponent,
    HostelSetupComponent,
    HostelSettingComponent,
    BedFareComponent,
    PIPES,
    RoomAllocationComponent,
    HostelPenaltyComponent,
    HostelSummaryComponent,
    RoomDeallocationComponent,
    StudentWiseHostelReportComponent,
    EmployeeWiseHostelReportComponent,
    HostelAttendanceComponent,
    HostelFeeSummaryComponent,
    ManageWardenComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelect2Module,
    BsDatepickerModule,
    OperationAndActivityRoutingModule,
  ],
})
export class OperationAndActivityModule {}
