import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAppointmentRegPageComponent } from './medical-appointment-reg-page.component';

describe('MedicalAppointmentRegPageComponent', () => {
  let component: MedicalAppointmentRegPageComponent;
  let fixture: ComponentFixture<MedicalAppointmentRegPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalAppointmentRegPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalAppointmentRegPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
