import { Component, OnInit } from '@angular/core';
import { Batch, Bed, BedFare, Class, Floor, Hostel, Room, RoomAllocation, RoomType, Student } from '../models';
import { BedService, FloorService, HostelService, RoomAllocationService, RoomService, RoomTypeService } from '../services';
import { BedFareService } from '../services/bed-fare.service';

@Component({
  selector: 'app-hostel-summary',
  templateUrl: './hostel-summary.component.html',
  styleUrls: ['./hostel-summary.component.css']
})
export class HostelSummaryComponent implements OnInit {

  classes: Class[] = [];
  students: Student[] = [];
  batches: Batch[] = [];
  hostels: Hostel[] = [];
  floors: Floor[] = [];
  rooms: Room[] = [];
  roomTypes: RoomType[] = [];
  beds: Bed[] = [];
  bedFares: BedFare[] = [];
  roomAllocations: RoomAllocation[] = [];
  filteredRoomAllocations: RoomAllocation[] = [];
  allocatedClassStudents: Student[] = [];

  showFeeDetails = false;

  constructor(private roomAllocationService: RoomAllocationService,
              private bedService: BedService, private roomService: RoomService,
              private floorService: FloorService, private hostelService: HostelService,
              private roomTypeService: RoomTypeService, private bedFareService: BedFareService) { }

  ngOnInit(): void {
    this.listClass();
    this.listAllocation();
    this.listStudent();
    this.listBatch();
    this.listBed();
    this.listRoom();
    this.listFloor();
    this.listHostel();
    this.listRoomType();
    this.listBedfare();
  }

  listBedfare() {
    this.bedFareService.getAll().subscribe((data: BedFare[]) => {
      this.bedFares = data;
    });
  }

  listRoomType() {
    this.roomTypeService.getAll().subscribe((data: RoomType[]) => {
      this.roomTypes = data;
    });
  }

  listHostel() {
    this.hostelService.getAll().subscribe((data: Hostel[]) => {
      this.hostels = data;
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

  listBed() {
    this.bedService.getAll().subscribe((data: Bed[]) => {
      this.beds = data;
    });
  }

  listBatch() {
    this.roomAllocationService.getAllBatches().subscribe((data: Batch[]) => {
      this.batches = data;
    });
  }

  listStudent() {
    this.roomAllocationService.getAllStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }

  listAllocation() {
    this.roomAllocationService.getAll().subscribe((data: RoomAllocation[]) => {
      this.roomAllocations = data;
    });
  }

  listClass() {
    this.roomAllocationService.getAllClasses().subscribe((data: Class[]) => {
      this.classes = data;
    });
  }

  filterSummary(selectedClass: Class) {
    this.allocatedClassStudents = this.students
      .filter(s => s.classCourseId === selectedClass.id)
      .filter(s => this.roomAllocations
        .filter(a => a.bedId).map(r => r.studentId).includes(s.id));
  }

  getBatch(id: number) {
    return this.batches.find(b => b.id === +id)?.batchName;
  }

  getHostel(studentId: number) {
    return this.getHostelByStudentId(studentId)?.name;
  }

  private getFloorByRoom(room: Room) {
    return this.floors.find(f => f.id === room?.floorId);
  }

  getRoomNo(studentId: number) {
    return this.getRoomByStudentId(studentId)?.roomNo;
  }

  private getBedById(bedId: number) {
    return this.beds.find(b => b.id === bedId);
  }

  getBedNo(studentId: number) {
    return this.getBedByStudentId(studentId)?.bedNo;
  }

  private getBedIdByStudentId(studentId: number) {
    return this.roomAllocations.find(r => r.studentId === studentId).bedId;
  }

  getRoomTypeId(studentId: number) {
    return this.getRoomByStudentId(studentId)?.roomTypeId;
  }

  getBedfare(studentId: number) {
    return this.bedFares.find(f => f.hostelId === this.getHostelByStudentId(studentId)?.id).fare;
  }

  private getHostelByStudentId(studentId: number) {
    const room = this.getRoomByStudentId(studentId);
    const floor = this.getFloorByRoom(room);
    const hostel = this.getHostelByFloor(floor);
    return hostel;
  }

  private getRoomByStudentId(studentId: number) {
    const bed = this.getBedByStudentId(studentId);
    const room = this.getRoomByBed(bed);
    return room;
  }

  private getBedByStudentId(studentId: number) {
    const bedId = this.getBedIdByStudentId(studentId);
    const bed = this.getBedById(bedId);
    return bed;
  }

  private getHostelByFloor(floor: Floor) {
    return this.hostels.find(h => h.id === floor?.hostelId);
  }

  private getRoomByBed(bed: Bed) {
    return this.rooms.find(r => r.id === bed?.roomId);
  }
}
