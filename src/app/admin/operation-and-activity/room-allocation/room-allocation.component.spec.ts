import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllocationComponent } from './room-allocation.component';

describe('RoomAllocationComponent', () => {
  let component: RoomAllocationComponent;
  let fixture: ComponentFixture<RoomAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
