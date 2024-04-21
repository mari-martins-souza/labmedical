import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRegisterPageComponent } from './exam-register-page.component';

describe('ExamRegisterPageComponent', () => {
  let component: ExamRegisterPageComponent;
  let fixture: ComponentFixture<ExamRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExamRegisterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExamRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
