import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataTransformService } from '../../shared/services/data-transform.service';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DataService } from '../../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam-register-page',
  standalone: true,
  imports: [ToolbarComponent, SidebarMenuComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule, HttpClientModule, MatAutocompleteModule],
  providers: [DataTransformService, DataService],
  templateUrl: './exam-register-page.component.html',
  styleUrl: './exam-register-page.component.scss'
})
export class ExamRegisterPageComponent implements OnInit {
  showMessage = false;
  patients: any[] = [];
  filteredPatients: Observable<any[]> | undefined;
  patientSearchControl = new FormControl();
  examId: any = '';

  constructor(private dataTransformService: DataTransformService, private titleService: Title, private fb: FormBuilder, private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  examRegister = this.fb.group({
    idPatient: ['',Validators.required],
    name: ['',Validators.required],
    exam: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    examDate: ['',Validators.required],
    examTime: ['',Validators.required],
    examType: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
    lab: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
    docUrl: ['',],
    result: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(1024)]],
  })

  ngOnInit() {

    this.titleService.setTitle('Registro de Exame');
  
    this.examId = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (this.examId) {
      this.dataService.getData('exams/' + this.examId).subscribe(exam => {
        this.examRegister.patchValue(exam);
      });
    } else {
      const currentDate = new Date();
      const dateString = currentDate.toISOString().split('T')[0];
      const timeString = currentDate.getHours() + ':' + currentDate.getMinutes();
    
      this.examRegister.patchValue({
        examDate: dateString,
        examTime: timeString,
      });
    }
    
    this.dataService.getData('patients').subscribe(data => {
      this.patients = data;
      this.filteredPatients = this.patientSearchControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.patients.slice())
        );
    });
    
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.patients.filter(patient => patient.name.toLowerCase().includes(filterValue));
  }

  setPatientData(patient: { id: any; name: any; }) {
    this.examRegister.patchValue({
      idPatient: patient.id,
      name: patient.name
    });
    this.patientSearchControl.setValue('');
  }
  
  saveExamRegister() {
    if (this.examRegister.valid) {
        
        const exam = {
          idPatient: this.examRegister.value.idPatient,
          name: this.examRegister.value.name,
          exam: this.examRegister.value.exam,
          examDate: this.dataTransformService.formatDate(this.examRegister.value.examDate),
          examTime: this.examRegister.value.examTime,
          examType: this.examRegister.value.examType,
          lab: this.examRegister.value.lab,
          docUrl: this.examRegister.value.docUrl,
          result: this.examRegister.value.result,
        }

        this.dataService.saveData('exams', exam).subscribe(() => {
          this.showMessage = true;

          setTimeout(() => {
            this.showMessage = false;
          }, 1000);

          const examDateControl = this.examRegister.get('examDate');
          const examTimeControl = this.examRegister.get('examTime');

          if (examDateControl && examTimeControl) {
            this.examRegister.reset({
              examDate: examDateControl.value,
              examTime: examTimeControl.value
          });
  }
    });
  } else {
    window.alert('Preencha todos os campos obrigatórios corretamente.')

    }
  }  
  
}



