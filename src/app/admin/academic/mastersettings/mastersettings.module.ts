import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MasterSettingsRoutingModule} from './mastersettings-routing.module';

import { LoaderService } from '../../../shared/loader.service';
import { LoaderInterceptor } from '../../../shared/loader-interceptor.service';
import { LoaderComponent } from '../../../shared/loader/loader.component';

import { MastersettingsComponent } from './mastersettings/mastersettings.component';
import { AcademicyearComponent } from './academicyear/academicyear.component';

@NgModule({
  declarations: [
    // LoaderComponent,
    MastersettingsComponent,
    AcademicyearComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BsDatepickerModule,
    MasterSettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MastersettingsModule { }
