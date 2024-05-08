import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightOffersComponent } from './flight-offers.component';

describe('FlightOffersComponent', () => {
  let component: FlightOffersComponent;
  let fixture: ComponentFixture<FlightOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
