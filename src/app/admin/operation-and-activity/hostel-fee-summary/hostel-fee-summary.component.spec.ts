import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelFeeSummaryComponent } from './hostel-fee-summary.component';

describe('HostelFeeSummaryComponent', () => {
  let component: HostelFeeSummaryComponent;
  let fixture: ComponentFixture<HostelFeeSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelFeeSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelFeeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
