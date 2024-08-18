import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataTransformService } from '../../shared/services/data-transform.service';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ErrorStateMatcher, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DataService } from '../../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { DialogComponent } from '../../shared/dialog/dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-exam-register-page',
  standalone: true,
  imports: [ToolbarComponent, SidebarMenuComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule, HttpClientModule, MatAutocompleteModule, DialogComponent],
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
  isEditing: boolean = false;
  saveDisabled: boolean = false;

  constructor(private dataTransformService: DataTransformService, private titleService: Title, private fb: FormBuilder, private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.isEditing = !!this.activatedRoute.snapshot.paramMap.get('id');
  }

  @ViewChild(DialogComponent) dialog!: DialogComponent;

  matcher = new MyErrorStateMatcher()

  examRegister = this.fb.group({
    idPatient: [{value: '', disabled: true}, Validators.required],
    name: [{value: '', disabled: true},Validators.required],
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
    d.setHours(d.getHours());
    return d;
  }

  ngOnInit() {

    this.titleService.setTitle('Registro de Exame');
  
    this.examId = this.activatedRoute.snapshot.paramMap.get('id');
    
    if (this.examId) {
      this.dataService.getData('exams/' + this.examId).subscribe(exam => {
        exam.examDate = this.dataTransformService.transformDateForForm(exam.examDate);
       
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
          idPatient: this.examRegister.getRawValue().idPatient,
          name: this.examRegister.getRawValue().name,
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
          // this.dialog.openDialog('O registro foi salvo com sucesso.'); 

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
            this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
    }
  }  

  saveEditExam() {
    if (this.examRegister.valid) {
      const exam = {
        id: this.examId,
        idPatient: this.examRegister.getRawValue().idPatient,
        name: this.examRegister.getRawValue().name,
        exam: this.examRegister.value.exam,
        examDate: this.dataTransformService.formatDate(this.examRegister.value.examDate),
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
      this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
    }
  }

  editExam(){
    this.examRegister.enable();

    this.examRegister.get('idPatient')!.disable();
    this.examRegister.get('name')!.disable();

    this.saveDisabled = false;
  }

  deleteExam(){
    this.dataService.deleteData('exams', this.examId).subscribe(() => {

      this.router.navigate(['/lista-prontuarios']);
    });
  }
  
}
  
  
  

  
  


