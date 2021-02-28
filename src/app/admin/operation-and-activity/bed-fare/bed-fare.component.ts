import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { BedFare, Hostel, RoomType } from '../models';
import { HostelService, RoomTypeService } from '../services';
import { BedFareService } from '../services/bed-fare.service';

const initialState = {
  id: [0],
  hostelId: [0, Validators.required],
  roomTypeId: [0, Validators.required],
  fare: [0, Validators.required],
  isActive: [true, Validators.required],
};

@Component({
  selector: 'app-bed-fare',
  templateUrl: './bed-fare.component.html',
  styleUrls: ['./bed-fare.component.css'],
})
export class BedFareComponent implements OnInit {
  form: FormGroup;
  bedFares: BedFare[] = [];
  filteredBedFares: BedFare[] = [];
  roomTypes: RoomType[] = [];
  hostels: Hostel[] = [];
  submitted = false;

  constructor(
    private bedFareService: BedFareService,
    private roomTypeService: RoomTypeService,
    private hostelService: HostelService,
    public fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.listBedFare();
    this.listRoomType();
    this.listHostel();
    this.form = this.fb.group(initialState);
  }

  listBedFare() {
    this.bedFareService.getAll().subscribe((data: BedFare[]) => {
      this.bedFares = this.filteredBedFares = data;
    });
  }

  listRoomType() {
    this.roomTypeService.getAll().subscribe((data: RoomType[]) => {
      this.roomTypes = data;
      this.form.patchValue({ roomTypeId: data[0].id });
    });
  }

  listHostel() {
    this.hostelService.getAll().subscribe((data: Hostel[]) => {
      this.hostels = data;
      this.form.patchValue({ hostelId: data[0].id });
    });
  }

  get f() {
    return this.form.controls;
  }

  submitForm() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if (this.form.get('id').value === 0) {
      this.bedFareService.create(this.form.value).subscribe((res) => {
        this.listBedFare();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000,
        });
        this.submitted = false;
        this.resetForm();
      });
    } else {
      this.bedFareService.update(this.form.get('id').value, this.form.value).subscribe((res) => {
        this.listBedFare();
        this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
          timeOut: 3000,
        });
        this.submitted = false;
        this.resetForm();
      });
    }
  }

  updateForm(id: number) {
    this.bedFareService.getById(id).subscribe((data: BedFare) => {
      this.form.patchValue(data);
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
        this.bedFareService.delete(id).subscribe((res) => {
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
          this.listBedFare();
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
    this.form = this.fb.group({
      ...initialState,
      hostelId: this.hostels[0].id,
      roomTypeId: this.roomTypes[0].id,
    });
  }

  onKeyUpEvent(event: any) {
    this.filter(event.target.value);
  }

  filter(keyword: any) {
    if (keyword === '') {
      this.filteredBedFares = this.bedFares;
    } else {
      const ids = this.hostels
        .filter((h) => h.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
        .map((h) => h.id);
      this.filteredBedFares = this.bedFares.filter((bedFare: BedFare) =>
        ids.includes(bedFare.hostelId)
      );
    }
  }

  get totalRows(): number {
    return this.bedFares.length;
  }
}
