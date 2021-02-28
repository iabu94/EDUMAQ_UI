import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDeallocationComponent } from './room-deallocation.component';

describe('RoomDeallocationComponent', () => {
  let component: RoomDeallocationComponent;
  let fixture: ComponentFixture<RoomDeallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDeallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDeallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
