import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecordListPageComponent } from './medical-record-list-page.component';

describe('MedicalRecordListPageComponent', () => {
  let component: MedicalRecordListPageComponent;
  let fixture: ComponentFixture<MedicalRecordListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalRecordListPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicalRecordListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
