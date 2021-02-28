import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SettingsService} from '../../mastersettings/settings.service';
import { Academicyear } from '../models/academicyear';
declare var $: any;

@Component({
  selector: 'app-academicyear',
  templateUrl: './academicyear.component.html',
  styleUrls: ['./academicyear.component.css']
})
export class AcademicyearComponent implements OnInit {

  academicyearForm: FormGroup;
  academicyears: Academicyear[] = [];
  academicyearFilteredList: Academicyear[] = [];
  submitted = false;
  searchText: string;
  startDate: string;
  endDate: string;

  @ViewChild('sd') sdate: ElementRef;

  constructor(public settingsService: SettingsService,
              public fb: FormBuilder,
              private toastr: ToastrService ) { }

  ngOnInit(): void {
    $('#startDate').datepicker().on('changeDate', (e) => {
    // var dateParts = this.formatDate(e.date).split('-');
    this.academicyearForm.get('startDate').patchValue(e.date);
    });

    $('#endDate').datepicker().on('changeDate', (e) => {
      // var dateParts = this.formatDate(e.date).split('-');
      this.academicyearForm.get('endDate').patchValue(e.date);
    });

    this.ListAcademicYear();

    this.academicyearForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isCurrentAcademicYear: ['', Validators.required]
    }, {
      validator:  this.validateDate('startDate', 'endDate')
  });
  }

 validateDate(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {

    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
    }

    console.log(Date.parse(control.value));
    console.log(Date.parse(matchingControl.value));
    // set error on matchingControl if validation fails
    if (Date.parse(control.value) > Date.parse(matchingControl.value)) {
        matchingControl.setErrors({ mustMatch: true });
    } else {
        matchingControl.setErrors(null);
    }
  };
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {month = '0' + month; }
    if (day.length < 2) {day = '0' + day; }
    return [day, month, year].join('-');
  }

ListAcademicYear() {
    this.settingsService.getAll().subscribe((data: Academicyear[]) => {
      console.log(data);
      this.academicyearFilteredList = this.academicyears = data;
    });
}

changeDate() {
alert('Listen');

}

onKeyUpEvent(event: any) {
  this.filter(event.target.value);
}

filter(keyword: any) {
  if ( keyword === '') {
    this.academicyearFilteredList = this.academicyears;
  } else {
  this.academicyearFilteredList = this.academicyears
                              .filter((academicyear: Academicyear) => academicyear.name.toLocaleLowerCase()
                              .includes(keyword.toLocaleLowerCase()));
  }
}

get totalRows(): number {
  return this.academicyearFilteredList.length;
}

  get f() { return this.academicyearForm.controls; }
  resetForm() {
    this.submitted = false;
    this.academicyearForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isCurrentAcademicYear: ['', Validators.required]
    }, {
      validator:  this.validateDate('startDate', 'endDate')
  });
  }
  submitForm() {
    this.submitted = true;
    if (this.academicyearForm.invalid) {
      if (this.f.endDate.errors.mustMatch) {
        this.toastr.warning('End date should not less than start date ', 'WARNING!!!', {
          timeOut: 3000
        });
      }
      return;
  }

    // this.academicyearForm.get('startDate').patchValue(this.formatDate(this.academicyearForm.get('startDate').value));
    // this.academicyearForm.get('endDate').patchValue(this.formatDate(this.academicyearForm.get('endDate').value));
    if (this.academicyearForm.get('id').value === 0) {
      if (this.academicyearForm.get('isCurrentAcademicYear').value) {
        this.settingsService.isCurrentAcademicYearExits().subscribe(res => {
            if (res) {
              Swal.fire({
                title: 'Are you sure?',
                text: 'You want to change current Academic Year',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
              }).then((result) => {
                if (result.value) {
                  this.settingsService.create(this.academicyearForm.value).subscribe(res => {
                    this.ListAcademicYear();
                    this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
                      timeOut: 3000
                    });
                    this.submitted = false;
                    this.academicyearForm.reset();
                  });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  this.submitted = false;
                  this.academicyearForm.reset();
                }
              });
            } else {
              this.settingsService.create(this.academicyearForm.value).subscribe(res => {
                this.ListAcademicYear();
                this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
                  timeOut: 3000
                });
                this.submitted = false;
                this.academicyearForm.reset();
              });
            }
        });
      } else {
        this.settingsService.create(this.academicyearForm.value).subscribe(res => {
          this.ListAcademicYear();
          this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
            timeOut: 3000
          });
          this.submitted = false;
          this.academicyearForm.reset();
        });
      }
    } else {
      this.settingsService.update(this.academicyearForm.get('id').value, this.academicyearForm.value).subscribe(res => {
        console.log('Academic year created!');
        this.ListAcademicYear();
        this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
          timeOut: 3000
        });
        this.submitted = false;
        this.academicyearForm.reset();
      });
    }
  }

  updateForm(id: number) {
    this.settingsService.getById(id).subscribe((data: Academicyear) => {
      console.log(data);
      this.academicyearForm = this.fb.group({
        id: [data.id],
        name: [data.name, Validators.required],
        startDate: [this.formatDate(data.startDate), Validators.required],
        endDate: [this.formatDate(data.endDate), Validators.required],
        isCurrentAcademicYear: [data.isCurrentAcademicYear, Validators.required]
      }, {
        validator:  this.validateDate('startDate', 'endDate')
    });
      $('#startDate').datepicker('update', this.formatDate(data.startDate));
      $('#endDate').datepicker('update', this.formatDate(data.endDate));
    });

  }

  deleteForm(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.settingsService.delete(id).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.ListAcademicYear();
        });
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      );
      }
    });
  }
}
