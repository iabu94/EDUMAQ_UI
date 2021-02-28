import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  Batch, Bed, BedFare, Class, Floor, Hostel, HostelType,
  Installment, Room, RoomAllocation, RoomType, Student
} from '../models';
import { Department } from '../models/get-only/department';
import { Employee } from '../models/get-only/employee';
import {
  BedService, FloorService, HostelService, RoomAllocationService,
  RoomService, RoomTypeService
} from '../services';
import { BedFareService } from '../services/bed-fare.service';
declare var $: any;

const initialState = {
  id: [0, Validators.required],
  allocateFor: ['1', Validators.required],
  classId: [0],
  batchId: [0],
  studentId: [0],
  departmentId: [0],
  employeeId: [0],
  joiningDate: ['', Validators.required],
  advanceAmount: ['', Validators.required],
  installmentId: [0, Validators.required],
  bedId: [0, Validators.compose([Validators.required, Validators.minLength(1)])]
};

@Component({
  selector: 'app-room-allocation',
  templateUrl: './room-allocation.component.html',
  styleUrls: ['./room-allocation.component.css'],
  providers: [DatePipe]
})
export class RoomAllocationComponent implements OnInit {
  hostels: Hostel[] = [];
  selectedHostel: Hostel;
  floors: Floor[] = [];
  filteredFloors: Floor[] = [];
  selectedFloor: Floor;
  rooms: Room[] = [];
  filteredRooms: Room[] = [];
  selectedRoom: Room;
  beds: Bed[] = [];
  filteredBeds: Bed[] = [];
  selectedBed: Bed;

  showFloorDetail = false;
  showRoomDetail = false;
  showBedDetail = false;
  submitted = false;

  classes: Class[] = [];
  selectedClass: Class;
  batches: Batch[] = [];
  filteredBatches: Batch[] = [];
  selectedBatch: Batch;
  departments: Department[] = [];
  selectedDepartment: Department;
  students: Student[] = [];
  filteredStudents: Student[] = [];
  selectedStudent: Student;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  selectedEmployee: Employee;
  installments: Installment[] = [];
  selectedInstallement: Installment;
  roomAllocations: RoomAllocation[] = [];

  HostelType = HostelType;
  roomTypes: RoomType[] = [];
  bedFares: BedFare[] = [];

  form: FormGroup;

  constructor(
    private hostelService: HostelService,
    private floorService: FloorService,
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private bedFareService: BedFareService,
    private bedService: BedService,
    private roomAllocationService: RoomAllocationService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    $('#joiningDate').datepicker().on('changeDate', (e) => {
      this.form.get('joiningDate').patchValue(e.date);
    });
    this.listHostel();
    this.listFloor();
    this.listRoom();
    this.listBed();
    this.listRoomType();
    this.listBedFare();
    this.listClass();
    this.listBatch();
    this.listStudent();
    this.listEmployee();
    this.listAllocation();
    this.listDepartment();
    this.listInstallments();
    this.form = this.fb.group({...initialState, joiningDate: this.datepipe.transform(new Date(), 'dd-MM-yyyy')});
  }

  listInstallments() {
    this.roomAllocationService.getAllInstallments().subscribe((data: Installment[]) => {
      this.installments = data;
    });
  }
  listDepartment() {
    this.roomAllocationService.getAllDepartments().subscribe((data: Department[]) => {
      this.departments = data;
    });
  }
  listEmployee() {
    this.roomAllocationService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = this.filteredEmployees = data;
    });
  }
  listAllocation() {
    this.roomAllocationService.getAll().subscribe((data: RoomAllocation[]) => {
      this.roomAllocations = data;
    });
  }
  listStudent() {
    this.roomAllocationService.getAllStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
  listBatch() {
    this.roomAllocationService.getAllBatches().subscribe((data: Batch[]) => {
      this.batches = data;
    });
  }
  listClass() {
    this.roomAllocationService.getAllClasses().subscribe((data: Class[]) => {
      this.classes = data;
    });
  }
  listBed() {
    this.bedService.getAll().subscribe((data: Bed[]) => {
      this.beds = data;
    });
  }
  listBedFare() {
    this.bedFareService.getAll().subscribe((data: BedFare[]) => {
      this.bedFares = data;
    });
  }
  listRoomType() {
    this.roomTypeService.getAll().subscribe((data: RoomType[]) => {
      this.roomTypes = data;
    });
  }
  listFloor() {
    this.floorService.getAll().subscribe((data: Floor[]) => {
      this.floors = data;
    });
  }
  listRoom() {
    this.roomService.getAll().subscribe((data: Room[]) => {
      this.rooms = data;
    });
  }
  listHostel() {
    this.hostelService.getAll().subscribe((data: Hostel[]) => {
      this.hostels = data;
    });
  }

  selectHostel(hostel: Hostel) {
    this.selectedHostel = hostel;
    this.showFloorDetail = true;
    this.showRoomDetail = this.showBedDetail = false;
    this.filterFloors(hostel);
  }

  filterFloors(hostel: Hostel) {
    this.filteredFloors = this.floors.filter((f) => f.hostelId === hostel.id);
  }

  getRoomsCount(floor: Floor) {
    return this.rooms.filter((r) => r.floorId === floor.id).length;
  }

  selectFloor(floor: Floor) {
    if (this.selectedFloor?.id !== floor.id) {
      this.showRoomDetail = true;
      this.selectedRoom = undefined;
    } else {
      this.showRoomDetail = !this.showRoomDetail;
    }
    this.showBedDetail = false;
    this.selectedFloor = floor;
    this.filteredRooms = this.rooms.filter((r) => r.floorId === floor.id);
  }

  selectRoom(room: Room) {
    this.selectedRoom = room;
    this.showBedDetail = true;
    this.filteredBeds = this.beds.filter((b) => b.roomId === room.id);
  }

  getBedFare() {
    return this.bedFares.find((bf) => bf.hostelId === this.selectedHostel.id).fare.toFixed(2);
  }

  get f() {
    return this.form.controls;
  }

  changeClass(id: number) {
    this.selectedClass = this.classes.find((c) => c.id === +id);
    this.filteredBatches = this.batches.filter((b) => b.classId === +id);
  }

  changeBatch(id: number) {
    this.selectedBatch = this.batches.find((b) => b.id === +id);
    this.filteredStudents = this.students.filter(
      (s) => s.classCourseId === this.selectedClass?.id && s.batchId === +id
    );
  }

  changeDepartment(id: number) {
    this.selectedDepartment = this.departments.find(d => d.id === +id);
    if (!this.selectedDepartment) {
      this.filteredEmployees = this.employees;
    } else {
    this.filteredEmployees = this.employees.filter(e => e.departmentId === this.selectedDepartment.id);
    }
  }

  changeAllocateFor(id: number) {
    +id === 1 ? (this.selectedEmployee = undefined) : (this.selectedStudent = undefined);
  }

  changeStudent(id: number) {
    this.selectedStudent = this.students.find((s) => s.id === +id);
  }

  submitForm() {
    this.submitted = true;

    if (this.form.invalid) {
      if (this.form.get('allocateFor').value === '1' && +this.form.get('studentId').value === 0) {
        this.toastr.warning('Please select a student to proceed...', 'WARNING!!!', {
          timeOut: 3000
        });
      }
      if (this.form.get('allocateFor').value === '2' && +this.form.get('employeeId').value === 0) {
        this.toastr.warning('Please select an employee to proceed...', 'WARNING!!!', {
          timeOut: 3000
        });
      }
      if (this.f.bedId.errors.required || this.form.get('bedId').value === 0) {
        this.toastr.warning('Bed is required.', 'WARNING!!!', {
          timeOut: 3000
        });
      }
      return;
    }
    if (this.form.get('id').value === 0) {
      this.roomAllocationService.create(this.form.value).subscribe(_ => {
        this.listAllocation();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000,
        });
        this.submitted = false;
        this.resetForm();
      });
    } else {
      this.roomAllocationService
        .update(this.form.get('id').value, this.form.value)
        .subscribe(_ => {
          this.listAllocation();
          this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
            timeOut: 3000,
          });
          this.submitted = false;
          this.resetForm();
        });
    }
  }

  resetForm() {
    this.submitted = false;
    this.selectedStudent = undefined;
    this.selectedEmployee = undefined;
    this.form = this.fb.group({...initialState, joiningDate: this.datepipe.transform(new Date(), 'dd-MM-yyyy')});
  }

  isAvailable(bed: Bed): boolean {
    const allocated = this.roomAllocations.find(r => r.bedId === bed.id);
    return !allocated;
  }

  getName(bed: Bed): string {
    const allocation = this.roomAllocations.find(a => a.bedId === bed.id);
    if (!allocation) {
      return null;
    }
    return allocation.allocateFor === 1 ? this.students.find(s => s.id === allocation.studentId).studentName
      : this.employees.find(e => e.id === allocation.employeeId).employeeName;
  }

  getClass(bed: Bed): string {
    const studentId = this.roomAllocations.find(a => a.bedId === bed.id)?.studentId;
    const classId = this.students.find(s => s.id === studentId)?.classCourseId;
    return this.classes.find(c => c.id === classId)?.classCode;
  }

  getBatch(bed: Bed): string {
    const studentId = this.roomAllocations.find(a => a.bedId === bed.id)?.studentId;
    const batchId = this.students.find(c => c.id === studentId)?.batchId;
    return this.batches.find(b => b.id === batchId)?.batchName;
  }

  getRollNo(bed: Bed): string {
    const studentId = this.roomAllocations.find(a => a.bedId === bed.id)?.studentId;
    return this.students.find(s => s.id === studentId)?.rollNo;
  }

  getHostelCapacity(hostel: Hostel) {
    const floorIds = this.floors.filter((f) => f.hostelId === hostel.id).map((f) => f.id);
    return this.rooms
      .filter((r) => floorIds.includes(r.floorId))
      .reduce((a, b) => a + b.capacity, 0);
  }

  getHostelAvailability(hostel: Hostel) {
    const floorIds = this.floors.filter(f => f.hostelId === hostel.id).map(f => f.id);
    const roomsIds = this.rooms.filter(r => floorIds.includes(r.floorId)).map(r => r.id);
    const bedIds = this.beds.filter(b => roomsIds.includes(b.roomId)).map(r => r.id);
    return this.beds.filter(b => bedIds.includes(b.id)).length - this.roomAllocations.filter(r => bedIds.includes(r.bedId)).length;
  }

  getFloorCapacity(floor: Floor) {
    return this.rooms.filter((r) => r.floorId === floor.id).reduce((a, b) => a + b.capacity, 0);
  }

  getFloorAvailability(floor: Floor) {
    const roomsIds = this.rooms.filter(r => r.floorId === floor.id).map(r => r.id);
    const bedIds = this.beds.filter(b => roomsIds.includes(b.roomId)).map(r => r.id);
    return this.beds.filter(b => bedIds.includes(b.id)).length - this.roomAllocations.filter(r => bedIds.includes(r.bedId)).length;
  }

  getRoomAvailability(room: Room) {
    const bedIds = this.beds.filter(b => b.roomId === room.id).map(r => r.id);
    return this.beds.filter(b => bedIds.includes(b.id)).length - this.roomAllocations.filter(r => bedIds.includes(r.bedId)).length;
  }
}
