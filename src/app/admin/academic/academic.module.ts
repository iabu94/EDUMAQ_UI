import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelect2Module } from 'ng-select2';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AcademicRoutingModule} from './academic-routing.module';
import { AcademicComponent } from './academic/academic.component';
import { MastersettingsModule } from './mastersettings/mastersettings.module';




@NgModule({
  declarations: [ AcademicComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgSelect2Module,
    AcademicRoutingModule,
    MastersettingsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AcademicModule { }
