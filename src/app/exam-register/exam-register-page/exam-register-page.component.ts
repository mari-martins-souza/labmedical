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
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DataService } from '../../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Exam } from '../../models/exam.model';
import { Patient } from '../../models/patient.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-exam-register-page',
  standalone: true,
  imports: [ToolbarComponent, SidebarMenuComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule, HttpClientModule, MatAutocompleteModule, DialogComponent, ConfirmDialogComponent],
  providers: [DataTransformService, DataService],
  templateUrl: './exam-register-page.component.html',
  styleUrl: './exam-register-page.component.scss'
})
export class ExamRegisterPageComponent implements OnInit {
  showMessage = false;
  patients: any[] = [];
  examId: any = '';
  filteredPatients: any[] = [];
  patientSearchControl = new FormControl();
  isEditing: boolean = false;
  saveDisabled: boolean = false;
  examRegistration: FormGroup;

  constructor(private dataTransformService: DataTransformService, private titleService: Title, private fb: FormBuilder, private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) { 
    this.isEditing = !!this.activatedRoute.snapshot.paramMap.get('id'),
    this.examRegistration = this.fb.group({
      idPatient: [{value: '', disabled: true}, Validators.required],
      name: [{value: '', disabled: true},Validators.required],
      exam: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
      examDate: ['',Validators.required],
      examTime: ['',Validators.required],
      examType: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      lab: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      docUrl: ['',],
      result: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(1024)]],
    });
  }

  @ViewChild(DialogComponent) dialog!: DialogComponent;
  @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;

  matcher = new MyErrorStateMatcher()

  setDate(date: Date) {
    let d = new Date(date);
    d.setHours(d.getHours());
    return d;
  }

  ngOnInit() {
    this.titleService.setTitle('Registro de Exame');
    this.examId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeExamForm();    
  }

  setCurrentTimeAndDate() {
    const currentDate = this.setDate(new Date());
    const dateString = moment(currentDate).format('YYYY-MM-DD');
    const timeString = moment(currentDate).format('HH:mm');
      
    this.examRegistration.patchValue({
      examDate: dateString,
      examTime: timeString,
    });
  }

  initializeExamForm() {
    if (this.examId) {
      this.dataService.getExam('exams/' + this.examId).subscribe(exam => {
        exam.examDate = this.dataTransformService.transformDateForForm(exam.examDate);
       
        this.examRegistration.patchValue(exam);
      });
    } else {
      this.setCurrentTimeAndDate();
    }
  }

  onSearch() {
    const searchTerm = this.patientSearchControl.value?.trim();
    console.log('Searching for:', searchTerm);
    
    if (searchTerm && searchTerm.length > 0) {
        this.dataService.getPatients(searchTerm, 'name').subscribe({
            next: (patients: Patient[]) => {
                this.filteredPatients = patients;
                this.patientSearchControl.reset();
            },
            error: (error) => {
                console.error('Error fetching patients:', error);
            }
        });
    } else {
        this.filteredPatients = [];
    }
  }

  selectPatient(patient: any): void {
    this.examRegistration.patchValue({
      idPatient: patient.id,
      name: patient.name
    })
    this.filteredPatients = [];
  }

  // private _filter(name: string): any[] {
  //   const filterValue = name.toLowerCase();
  //   return this.patients.filter(patient => patient.name.toLowerCase().includes(filterValue));
  // }

  setPatientData(patient: { id: any; name: any; }) {
    this.examRegistration.patchValue({
      idPatient: patient.id,
      name: patient.name
    });

    this.patientSearchControl.setValue('');
  }

  examRegister() {
    if (this.examRegistration.valid) {
        
        const newExam: Exam = {
          id: this.examRegistration.getRawValue().idPatient,
          exam: this.examRegistration.value.exam,
          examDate: this.dataTransformService.formatDate(this.examRegistration.value.examDate),
          examTime: this.examRegistration.value.examTime,
          examType: this.examRegistration.value.examType,
          lab: this.examRegistration.value.lab,
          docUrl: this.examRegistration.value.docUrl,
          result: this.examRegistration.value.result,
        }

        this.dataService.saveExam(newExam).subscribe({
          next: (response) => {
            console.log('Exam saved successfully:', response);
            this.showMessage = true;
            this.examRegistration.reset();
            this.setCurrentTimeAndDate();

          setTimeout(() => {
            this.showMessage = false;
          }, 1000);
        },
        error: (error) => {
          console.error('Error saving exam:', error);
        }
      });
      
    } else {
      this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
    }
  }
  
  // saveExamRegister() {
  //   if (this.examRegistration.valid) {
        
  //       const exam = {
  //         idPatient: this.examRegistration.getRawValue().idPatient,
  //         name: this.examRegistration.getRawValue().name,
  //         exam: this.examRegistration.value.exam,
  //         examDate: this.dataTransformService.formatDate(this.examRegistration.value.examDate),
  //         examTime: this.examRegistration.value.examTime,
  //         examType: this.examRegistration.value.examType,
  //         lab: this.examRegistration.value.lab,
  //         docUrl: this.examRegistration.value.docUrl,
  //         result: this.examRegistration.value.result,
  //       }

  //       this.dataService.saveData('exams', exam).subscribe(() => {
  //         this.showMessage = true;

  //         setTimeout(() => {
  //           this.showMessage = false;
  //         }, 1000);

  //         const examDateControl = this.examRegistration.get('examDate');
  //         const examTimeControl = this.examRegistration.get('examTime');

  //         if (examDateControl && examTimeControl) {
  //           this.examRegistration.reset({
  //             examDate: examDateControl.value,
  //             examTime: examTimeControl.value
  //         });
  //         }
  //         });
  //         } else {
  //           this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
  //   }
  // }  

  // saveEditExam() {
  //   if (this.examRegistration.valid) {
  //     const exam = {
  //       id: this.examId,
  //       idPatient: this.examRegistration.getRawValue().idPatient,
  //       name: this.examRegistration.getRawValue().name,
  //       exam: this.examRegistration.value.exam,
  //       examDate: this.dataTransformService.formatDate(this.examRegistration.value.examDate),
  //       examTime: this.examRegistration.value.examTime,
  //       examType: this.examRegistration.value.examType,
  //       lab: this.examRegistration.value.lab,
  //       docUrl: this.examRegistration.value.docUrl,
  //       result: this.examRegistration.value.result,
  //     }
  
  //     this.dataService.editData('exams', this.examId, exam).subscribe(() => {
  //       this.showMessage = true;

  //       this.examRegistration.disable();
  //       this.saveDisabled = true;
        
  
  //       setTimeout(() => {
  //         this.showMessage = false;
  //       }, 1000);
  //     });

  //   } else {
  //     this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
  //   }
  // }

  // editExam(){
  //   this.examRegistration.enable();

  //   this.examRegistration.get('idPatient')!.disable();
  //   this.examRegistration.get('name')!.disable();

  //   this.saveDisabled = false;
  // }

  // deleteExam(){
  //   this.confirmDialog.openDialog("Tem certeza que deseja excluir o exame? Essa ação não pode ser desfeita.")
  //   const subscription = this.confirmDialog.confirm.subscribe(result => {
  //     if (result) {
  //       this.dataService.deleteData('exams', this.examId).subscribe(() => {
  //         this.router.navigate(['/lista-prontuarios']);
  //         subscription.unsubscribe();
  //       });
  //     } else {
  //       subscription.unsubscribe();
  //       }
  //     });
  //   }
}
  
  
  

  
  


