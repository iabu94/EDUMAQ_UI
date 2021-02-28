import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { RoomType } from '../models/room-type';
import { RoomTypeService } from '../services/room-type.service';

const initialState = {
  id: [0],
  type: ['', Validators.required],
  description: [''],
  isActive: [true, Validators.required]
};

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css']
})
export class RoomTypeComponent implements OnInit {

  roomTypeForm: FormGroup;
  roomTypes: RoomType[] = [];
  filteredRoomTypes: RoomType[] = [];
  submitted = false;

  constructor(private roomTypeSerive: RoomTypeService,
              public fb: FormBuilder,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listRoomType();
    this.roomTypeForm = this.fb.group(initialState);
  }

  listRoomType() {
    this.roomTypeSerive.getAll().subscribe((data: RoomType[]) => {
      this.filteredRoomTypes = this.roomTypes = data;
    });
  }

  get f() { return this.roomTypeForm.controls; }

  submitForm() {
    this.submitted = true;

    if (this.roomTypeForm.invalid) {
      return;
    }

    if (this.roomTypeForm.get('id').value === 0) {
      this.roomTypeSerive.create(this.roomTypeForm.value).subscribe(res => {
        this.listRoomType();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        this.submitted = false;
        this.resetForm();
      });
    } else {
      this.roomTypeSerive.update(this.roomTypeForm.get('id').value, this.roomTypeForm.value).subscribe(res => {
        this.listRoomType();
        this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
          timeOut: 3000
        });
        this.submitted = false;
        this.resetForm();
      });
    }
  }

  updateForm(id: number) {
    this.roomTypeSerive.getById(id).subscribe((data: RoomType) => {
      this.roomTypeForm.patchValue(data);
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
        this.roomTypeSerive.delete(id).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.listRoomType();
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

  resetForm() {
    this.submitted = false;
    this.roomTypeForm = this.fb.group(initialState);
  }

  onKeyUpEvent(event: any) {
    this.filter(event.target.value);
  }

  filter(keyword: any) {
    if (keyword === '') {
      this.filteredRoomTypes = this.roomTypes;
    } else {
      this.filteredRoomTypes = this.roomTypes
        .filter((roomType: RoomType) => roomType.type.toLocaleLowerCase()
          .includes(keyword.toLocaleLowerCase()));
    }
  }

  get totalRows(): number {
    return this.roomTypes.length;
  }
}
