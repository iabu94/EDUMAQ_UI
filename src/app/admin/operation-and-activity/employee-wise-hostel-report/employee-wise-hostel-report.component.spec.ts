import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWiseHostelReportComponent } from './employee-wise-hostel-report.component';

describe('EmployeeWiseHostelReportComponent', () => {
  let component: EmployeeWiseHostelReportComponent;
  let fixture: ComponentFixture<EmployeeWiseHostelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWiseHostelReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWiseHostelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
