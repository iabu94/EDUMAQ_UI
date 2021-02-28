import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Batch, Class, HostelPenalty, Student } from '../models';
import { Department } from '../models/get-only/department';
import { Employee } from '../models/get-only/employee';
import { HostelPenaltyService, RoomAllocationService } from '../services';

const initialState = {
  id: [0],
  personType: ['1', Validators.required],
  classId: [0],
  batchId: [0],
  studentId: [0],
  departmentId: [0],
  employeeId: [0],
  penaltyFor: ['', Validators.required],
  amount: ['', Validators.required],
  description: ['']
};

@Component({
  selector: 'app-hostel-penalty',
  templateUrl: './hostel-penalty.component.html',
  styleUrls: ['./hostel-penalty.component.css']
})
export class HostelPenaltyComponent implements OnInit {

  classes: Class[] = [];
  batches: Batch[] = [];
  students: Student[] = [];
  employees: Employee[] = [];
  departments: Department[] = [];
  penalties: HostelPenalty[] = [];

  filteredBatches: Batch[] = [];
  filteredStudents: Student[] = [];
  filteredDepartments: Department[] = [];
  filteredEmployees: Employee[] = [];
  filteredPenalties: HostelPenalty[] = [];

  selectedClass: Class;
  selectedBatch: Batch;
  selectedStudent: Student;
  selectedDepartment: Department;
  selectedEmployee: Employee;
  selectedPenalty: HostelPenalty;
  selectedPersonType: number;

  form: FormGroup;
  submitted = false;
  showReverseDialog = false;

  constructor(private fb: FormBuilder,
              private roomAllocationService: RoomAllocationService,
              private hostelPenaltyService: HostelPenaltyService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listEmployee();
    this.listStudent();
    this.listDepartment();
    this.listClass();
    this.listBatch();
    this.listPenalty();
    this.selectedPersonType = 1;
    this.form = this.fb.group(initialState);
  }

  listPenalty() {
    this.hostelPenaltyService.getAll().subscribe((data: HostelPenalty[]) => {
      this.penalties = data;
    });
  }
  listEmployee() {
    this.roomAllocationService.getAllEmployees().subscribe((data: Employee[]) => {
      this.employees = this.filteredEmployees = data;
    });
  }
  listStudent() {
    this.roomAllocationService.getAllStudents().subscribe((data: Student[]) => {
      this.students = data;
    });
  }
  listDepartment() {
    this.roomAllocationService.getAllDepartments().subscribe((data: Department[]) => {
      this.departments = this.filteredDepartments = data;
    });
  }
  listClass() {
    this.roomAllocationService.getAllClasses().subscribe((data: Class[]) => {
      this.classes = data;
    });
  }
  listBatch() {
    this.roomAllocationService.getAllBatches().subscribe((data: Batch[]) => {
      this.batches = data;
    });
  }

  get f() {
    return this.form.controls;
  }

  selectClass(id: number) {
    this.selectedClass = this.classes.find(c => c.id === +id);
    this.filteredBatches = this.batches.filter(b => b.classId === this.selectedClass.id);
    this.selectedBatch = this.selectedStudent = undefined;
  }

  selectBatch(id: number) {
    this.selectedBatch = this.batches.find(b => b.id === +id);
    this.filteredStudents = this.students.filter(s => s.batchId === this.selectedBatch.id);
    this.selectedStudent = undefined;
  }

  selectStudent(id: number) {
    this.selectedStudent = this.students.find(s => s.id === +id);
    if (this.selectedStudent) {
      this.filteredPenalties = this.penalties.filter(p => p.studentId === this.selectedStudent.id);
    }
  }

  selectEmployee(id: number) {
    this.selectedEmployee = this.employees.find(e => e.id === +id);
  }

  selectDepartment(id: number) {
    this.selectedDepartment = this.departments.find(d => d.id === +id);
    this.filteredEmployees = this.employees.filter(e => +id === 0 ? e : e.departmentId === this.selectedDepartment.id);
    this.selectedDepartment = undefined;
  }

  submitForm() {
    this.submitted = true;

    if (this.selectedPersonType === 1 && !this.selectedStudent) {
      this.toastr.warning('Please select a student to proceed...', 'WARNING!!!', {
        timeOut: 3000
      });
    }

    if (this.selectedPersonType === 2 && !this.selectedEmployee) {
      this.toastr.warning('Please select an Employee to proceed...', 'WARNING!!!', {
        timeOut: 3000
      });
    }

    if (this.form.invalid) {
      return;
    }

    if (this.form.get('id').value === 0) {
      this.hostelPenaltyService.create(this.form.value).subscribe((res) => {
        this.listPenalty();
        this.toastr.success('Records has been sucessfully saved', 'SUCCESS!', {
          timeOut: 3000,
        });
        this.submitted = false;
        this.resetForm();
      });
    } else {
      this.hostelPenaltyService
        .update(this.form.get('id').value, this.form.value)
        .subscribe((res) => {
          this.listPenalty();
          this.toastr.success('Records has been sucessfully updated', 'SUCCESS!', {
            timeOut: 3000,
          });
          this.submitted = false;
          this.resetForm();
        });
    }
  }

  resetForm() {
    this.selectedPersonType = 1;
    this.selectedStudent = this.selectedEmployee = undefined;
    this.filteredStudents = this.filteredEmployees = [];
    this.form = this.fb.group(initialState);
  }

  getClass(id: number) {
    return this.classes.find(c => c.id === +id).classCode;
  }

  personTypeChange(id: number) {
    this.selectedPersonType = +id;
    this.selectedStudent = this.selectedEmployee = undefined;
  }

  reverse(penalty: HostelPenalty) {
    this.showReverseDialog = true;
  }

  close() {
    this.showReverseDialog = false;
  }

  getDepartment() {
    return this.departments.find(d => d.id === this.selectedEmployee?.departmentId)?.departmentName;
  }
}
