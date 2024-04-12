import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRegistrationPageComponent } from './patient-registration-page.component';

describe('PatientRegistrationPageComponent', () => {
  let component: PatientRegistrationPageComponent;
  let fixture: ComponentFixture<PatientRegistrationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientRegistrationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientRegistrationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
