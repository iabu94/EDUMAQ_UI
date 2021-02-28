import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedFareComponent } from './bed-fare.component';

describe('BedFareComponent', () => {
  let component: BedFareComponent;
  let fixture: ComponentFixture<BedFareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedFareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedFareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
