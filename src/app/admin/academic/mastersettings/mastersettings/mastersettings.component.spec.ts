import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersettingsComponent } from './mastersettings.component';

describe('MastersettingsComponent', () => {
  let component: MastersettingsComponent;
  let fixture: ComponentFixture<MastersettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MastersettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastersettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
