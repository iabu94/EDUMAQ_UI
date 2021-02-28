import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWiseHostelReportComponent } from './student-wise-hostel-report.component';

describe('StudentWiseHostelReportComponent', () => {
  let component: StudentWiseHostelReportComponent;
  let fixture: ComponentFixture<StudentWiseHostelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentWiseHostelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWiseHostelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
