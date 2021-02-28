import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWardenComponent } from './manage-warden.component';

describe('ManageWardenComponent', () => {
  let component: ManageWardenComponent;
  let fixture: ComponentFixture<ManageWardenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWardenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWardenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
