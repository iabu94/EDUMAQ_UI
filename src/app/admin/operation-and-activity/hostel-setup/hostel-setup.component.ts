import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Bed, Floor, Hostel, HostelType, Room, RoomType } from '../models';
import { BedService, FloorService, HostelService, RoomService, RoomTypeService } from '../services';

const initialFloorState = {
  id: [0],
  hostelId: [0, Validators.required],
  floorNo: ['', Validators.required],
  isActive: [true, Validators.required]
};
const initialRoomState = {
  id: [0],
  floorId: [0, Validators.required],
  roomNo: ['', Validators.required],
  capacity: ['', Validators.required],
  roomTypeId: [1, Validators.required],
  isActive: [true, Validators.required]
};
const initialBedState = {
  id: [0],
  roomId: [0, Validators.required],
  bedNo: ['', Validators.required],
  description: [''],
  isActive: [true, Validators.required]
};

@Component({
  selector: 'app-hostel-setup',
  templateUrl: './hostel-setup.component.html',
  styleUrls: ['./hostel-setup.component.css']
})
export class HostelSetupComponent implements OnInit {

  floorForm: FormGroup;
  roomForm: FormGroup;
  bedForm: FormGroup;

  floorSubmitted = false;
  roomSubmitted = false;
  bedSubmitted = false;

  showHostels = true;
  showFloors = true;
  showRooms = true;
  showBeds = true;

  selectedHostel: Hostel;
  selectedFloor: Floor;
  selectedRoom: Room;
  selectedBed: Bed;

  HostelType = HostelType;
  hostels: Hostel[] = [];
  floors: Floor[] = [];
  filteredFloors: Floor[] = [];
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  beds: Bed[] = [];
  filteredBeds: Bed[] = [];
  roomTypes: RoomType[] = [];

  constructor(private hostelService: HostelService,
              private floorService: FloorService,
              private roomService: RoomService,
              private bedService: BedService,
              private roomTypeService: RoomTypeService,
              public fb: FormBuilder,
              private toastr: ToastrService) {
              }

  ngOnInit(): void {
    this.showFloors = this.showRooms = this.showBeds = false;
    this.loadLists();
    this.initializeForms();
    this.roomForm.valueChanges.subscribe(val => console.log(val));
  }

  loadLists() {
    this.listHostel();
    this.listFloor();
    this.listRoom();
    this.listBed();
    this.listRoomTypes();
  }

  initializeForms() {
    this.floorForm = this.fb.group(initialFloorState);
    this.roomForm = this.fb.group(initialRoomState);
    this.bedForm = this.fb.group(initialBedState);
  }

  listHostel() {
    this.hostelService.getAll().subscribe((data: Hostel[]) => {
      this.hostels = data;
    });
  }

  listFloor() {
    this.floorService.getAll().subscribe((data: Floor[]) => {
      this.floors = data;
      this.filteredFloors = data.filter(d => d.hostelId === this.selectedHostel?.id);
    });
  }

  listRoom() {
    this.roomService.getAll().subscribe((data: Room[]) => {
      this.rooms = data;
      this.filteredRooms = data.filter(d => d.floorId === this.selectedFloor?.id);
    });
  }

  listRoomTypes() {
    this.roomTypeService.getAll().subscribe((data: RoomType[]) => {
      this.roomTypes = data;
    });
  }

  listBed() {
    this.bedService.getAll().subscribe((data: Bed[]) => {
      this.beds = data;
      this.filteredBeds = data.filter(d => d.roomId === this.selectedRoom?.id);
    });
  }

  get f() { return this.floorForm.controls; }
  get r() { return this.roomForm.controls; }
  get b() { return this.bedForm.controls; }

  selectHostel(hostel: Hostel) {
    this.showHostels = this.showFloors = true;
    this.showRooms = this.showBeds = false;
    this.selectedHostel = hostel;
    this.selectedFloor = undefined;
    this.filterFloors();
    this.floorForm = this.fb.group({...initialFloorState, hostelId: [hostel.id]});
  }

  submitFloorForm() {
    this.floorSubmitted = true;

    if (this.floorForm.invalid) {
      return;
    }

    if (this.floorForm.get('id').value === 0) {
      this.floorService.create(this.floorForm.value).subscribe(res => {
        this.listFloor();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        this.floorSubmitted = false;
        this.resetFloorForm();
      });
    } else {
      this.floorService.update(this.floorForm.get('id').value, this.floorForm.value).subscribe(res => {
        this.listFloor();
        this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
          timeOut: 3000
        });
        this.floorSubmitted = false;
        this.resetFloorForm();
      });
    }
  }

  submitRoomForm() {
    this.roomSubmitted = true;

    if (this.roomForm.invalid) {
      return;
    }

    if (this.roomForm.get('id').value === 0) {
      this.roomService.create(this.roomForm.value).subscribe(res => {
        this.listRoom();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        this.roomSubmitted = false;
        this.resetRoomForm();
      });
    } else {
      this.roomService.update(this.roomForm.get('id').value, this.roomForm.value).subscribe(res => {
        this.listRoom();
        this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
          timeOut: 3000
        });
        this.roomSubmitted = false;
        this.resetRoomForm();
      });
    }
  }

  submitBedForm() {
    this.bedSubmitted = true;

    if (this.bedForm.invalid) {
      return;
    }

    if (this.bedForm.get('id').value === 0) {
      this.bedService.create(this.bedForm.value).subscribe(res => {
        this.listBed();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000
        });
        this.bedSubmitted = false;
        this.resetBedForm();
      });
    } else {
      this.bedService.update(this.bedForm.get('id').value, this.bedForm.value).subscribe(res => {
        this.listBed();
        this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
          timeOut: 3000
        });
        this.bedSubmitted = false;
        this.resetBedForm();
      });
    }
  }

  resetFloorForm() {
    this.floorSubmitted = false;
    this.floorForm = this.fb.group({...initialFloorState,
      hostelId: [this.selectedHostel?.id, Validators.required]});
  }

  resetRoomForm() {
    this.roomSubmitted = false;
    this.roomForm = this.fb.group({...initialRoomState,
      floorId: [this.selectedFloor?.id, Validators.required]});
  }

  resetBedForm() {
    this.bedSubmitted = false;
    this.bedForm = this.fb.group({...initialBedState,
      roomId: [this.selectedRoom?.id, Validators.required]});
  }

  selectFloor(floor: Floor) {
    this.showHostels = this.showFloors = this.showRooms = true;
    this.showBeds = false;
    this.selectedFloor = floor;
    this.selectedBed = undefined;
    this.filterRooms();
    this.roomForm = this.fb.group({...initialRoomState, floorId: [floor.id]});
  }

  selectRoom(room: Room) {
    console.log(room);
    this.showHostels = this.showFloors = this.showRooms = this.showBeds = true;
    this.selectedRoom = room;
    this.filterBeds();
    this.bedForm = this.fb.group({...initialBedState, roomId: [room.id]});
  }

  selectBed(bed: Bed) {
    this.showHostels = this.showFloors = this.showBeds = this.showBeds = true;
    this.selectedBed = bed;
    this.bedForm = this.fb.group({...initialBedState, bedId: [bed.id, Validators.required]});
  }

  updateFloorForm(id: number) {
    this.floorService.getById(id).subscribe((data: Floor) => {
      this.floorForm.patchValue(data);
    });
  }

  updateRoomForm(id: number) {
    this.roomService.getById(id).subscribe((data: Room) => {
      this.roomForm.patchValue(data);
    });
  }

  updateBedForm(id: number) {
    this.bedService.getById(id).subscribe((data: Bed) => {
      this.bedForm.patchValue(data);
    });
  }

  deleteFloorForm(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.floorService.delete(id).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.listFloor();
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

  deleteRoomForm(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.roomService.delete(id).subscribe(res => {
          this.listRoom();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
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

  deleteBedForm(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.bedService.delete(id).subscribe(res => {
          this.listBed();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
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

  filterFloors() {
    this.filteredFloors = this.floors.filter(f => f.hostelId === this.selectedHostel?.id);

  }

  filterRooms() {
    this.filteredRooms = this.rooms.filter(r => r.floorId === this.selectedFloor?.id);
  }

  filterBeds() {
    this.filteredBeds = this.beds.filter(b => b.roomId === this.selectedRoom?.id);
  }
}
