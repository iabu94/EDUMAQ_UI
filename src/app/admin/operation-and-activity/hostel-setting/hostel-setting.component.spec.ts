import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelSettingComponent } from './hostel-setting.component';

describe('HostelSettingComponent', () => {
  let component: HostelSettingComponent;
  let fixture: ComponentFixture<HostelSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
