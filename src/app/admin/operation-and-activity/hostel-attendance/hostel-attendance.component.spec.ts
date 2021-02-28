import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelAttendanceComponent } from './hostel-attendance.component';

describe('HostelAttendanceComponent', () => {
  let component: HostelAttendanceComponent;
  let fixture: ComponentFixture<HostelAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
