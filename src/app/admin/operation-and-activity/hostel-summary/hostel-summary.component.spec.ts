import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelSummaryComponent } from './hostel-summary.component';

describe('HostelSummaryComponent', () => {
  let component: HostelSummaryComponent;
  let fixture: ComponentFixture<HostelSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
