import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Hostel, HostelType } from '../models/hostel';
import { HostelService } from '../services/hostel.service';

const initialState = {
  id: [0],
  name: ['', Validators.required],
  type: [HostelType.Common, Validators.required],
  description: [''],
  isActive: [true, Validators.required]
};

@Component({
  selector: 'app-create-hostel',
  templateUrl: './create-hostel.component.html',
  styleUrls: ['./create-hostel.component.css']
})
export class CreateHostelComponent implements OnInit {
  hostelForm: FormGroup;
  hostels: Hostel[] = [];
  filteredHostels: Hostel[] = [];
  submitted = false;
  HostelType = HostelType;

  constructor(
    private hostelService: HostelService,
    public fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.listHostel();
    this.hostelForm = this.fb.group(initialState);
  }

  listHostel() {
    this.hostelService.getAll().subscribe((data: Hostel[]) => {
      this.filteredHostels = this.hostels = data;
    });
  }

  get f() {
    return this.hostelForm.controls;
  }

  submitForm() {
    this.submitted = true;

    if (this.hostelForm.invalid) {
      return;
    }

    if (this.hostelForm.get('id').value === 0) {
      this.hostelService.create(this.hostelForm.value).subscribe((res) => {
        this.listHostel();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000,
        });
        this.submitted = false;
        this.resetForm();
      });
    } else {
      this.hostelService
        .update(this.hostelForm.get('id').value, this.hostelForm.value)
        .subscribe((res) => {
          this.listHostel();
          this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
            timeOut: 3000,
          });
          this.submitted = false;
          this.resetForm();
        });
    }
  }

  updateForm(id: number) {
    this.hostelService.getById(id).subscribe((data: Hostel) => {
      this.hostelForm.patchValue(data);
    });
  }

  deleteForm(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.hostelService.delete(id).subscribe((res) => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          this.listHostel();
        });
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }

  resetForm() {
    this.submitted = false;
    this.hostelForm = this.fb.group(initialState);
  }

  onKeyUpEvent(event: any) {
    this.filter(event.target.value);
  }

  filter(keyword: any) {
    if (keyword === '') {
      this.filteredHostels = this.hostels;
    } else {
      this.filteredHostels = this.hostels.filter((hostel: Hostel) =>
        hostel.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
      );
    }
  }

  get totalRows(): number {
    return this.hostels.length;
  }
}
