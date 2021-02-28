import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelSetupComponent } from './hostel-setup.component';

describe('HostelSetupComponent', () => {
  let component: HostelSetupComponent;
  let fixture: ComponentFixture<HostelSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
