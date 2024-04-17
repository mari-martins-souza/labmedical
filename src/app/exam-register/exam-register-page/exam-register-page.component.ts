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
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from '../../shared/CustomDateAdapter';

@Component({
  selector: 'app-exam-register-page',
  standalone: true,
  imports: [ToolbarComponent, SidebarMenuComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule, HttpClientModule, MatAutocompleteModule],
  providers: [DataTransformService, DataService, {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, { provide: DateAdapter, useClass: CustomDateAdapter }, { provide: MAT_DATE_FORMATS, useValue: {
    parse: {
        dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
    },
    display: {
        dateInput: 'input',
        monthYearLabel: {year: 'numeric', month: 'short'},
        dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
    }
  }}
  ],
  templateUrl: './exam-register-page.component.html',
  styleUrl: './exam-register-page.component.scss'
})
export class ExamRegisterPageComponent implements OnInit {
  showMessage = false;
  patients: any[] = [];
  filteredPatients: Observable<any[]> | undefined;
  patientSearchControl = new FormControl();
  examId: any = '';
  isEditing: boolean = false;
  saveDisabled: boolean = false;

  constructor(private dataTransformService: DataTransformService, private titleService: Title, private fb: FormBuilder, private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.isEditing = !!this.activatedRoute.snapshot.paramMap.get('id');
  }

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

  setDate(date: Date) {
    let d = new Date(date);
    d.setHours(d.getHours() + 24);
    return d;
  }

  ngOnInit() {

    this.titleService.setTitle('Registro de Exame');
  
    this.examId = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (this.examId) {
      this.dataService.getData('exams/' + this.examId).subscribe(exam => {
        const examDate = moment(exam.examDate, 'DD-MM-YYYY').toDate();
        exam.examDate = examDate;
        this.examRegister.patchValue(exam);
      });
    } else {
      const currentDate = this.setDate(new Date());
      
      const dateString = moment(currentDate).format('YYYY-MM-DD');
      const timeString = moment(currentDate).format('HH:mm');
      
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

  saveEditExam() {
    if (this.examRegister.valid) {
      const exam = {
        id: this.examId,
        idPatient: this.examRegister.value.idPatient,
        name: this.examRegister.value.name,
        exam: this.examRegister.value.exam,
        examDate: moment(this.examRegister.value.examDate).format('DD-MM-YYYY'),
        examTime: this.examRegister.value.examTime,
        examType: this.examRegister.value.examType,
        lab: this.examRegister.value.lab,
        docUrl: this.examRegister.value.docUrl,
        result: this.examRegister.value.result,
      }
  
      this.dataService.editData('exams', this.examId, exam).subscribe(() => {
        this.showMessage = true;
        this.examRegister.disable();
        this.saveDisabled = true;
  
        setTimeout(() => {
          this.showMessage = false;
        }, 1000);
  
      });
    } else {
      window.alert('Preencha todos os campos obrigatórios corretamente.');
    }
  }

  editExam(){
    this.examRegister.enable();
    this.saveDisabled = false;
  }

  deleteExam(){
    this.dataService.deleteData('exams', this.examId).subscribe(() => {
      window.alert('O registro foi excluído');
      this.router.navigate(['/lista-prontuarios']);
    });
  }
  
}
  
  
  

  
  


