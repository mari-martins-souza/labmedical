import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DataTransformService } from '../../shared/services/data-transform.service';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DataService } from '../../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { Appointment } from '../../models/appointment.model';
import { Patient } from '../../models/patient.model';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-medical-appointment-reg-page',
  standalone: true,
  imports: [ToolbarComponent, SidebarMenuComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatButtonModule, MatButton, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule, HttpClientModule, MatAutocompleteModule, DialogComponent, ConfirmDialogComponent],
  providers: [DataTransformService, DataService],
  templateUrl: './medical-appointment-reg-page.component.html',
  styleUrl: './medical-appointment-reg-page.component.scss'
})
export class MedicalAppointmentRegPageComponent implements OnInit {
  showMessage = false;
  appointmentId: any = '';
  patients: any[] = [];
  filteredPatients: any[] = [];
  patientSearchControl = new FormControl();
  isEditing: boolean = false;
  saveDisabled: boolean = false;
  appointRegistration: FormGroup;

  constructor(private dataTransformService: DataTransformService, private titleService: Title, private fb: FormBuilder, private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.isEditing = !!this.activatedRoute.snapshot.paramMap.get('id'),
    this.appointRegistration = this.fb.group({
    idPatient: [{value: '', disabled: true}, Validators.required],
    name: [{value: '', disabled: true}, Validators.required],
    reason: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    consultDate: ['',Validators.required],
    consultTime: ['',Validators.required],
    problemDescrip: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(1024)]],
    prescMed: ['',],
    dosagesPrec: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(256)]],
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
    this.titleService.setTitle('Registro de Consulta');
    this.appointmentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.initializeAppointmentForm();
  }

  setCurrentTimeAndDate() {
    const currentDate = this.setDate(new Date());
    const dateString = moment(currentDate).format('YYYY-MM-DD');
    const timeString = moment(currentDate).format('HH:mm');

    this.appointRegistration.patchValue({
      consultDate: dateString,
      consultTime: timeString,
    });
  }

  initializeAppointmentForm() {
    if (this.appointmentId) {
      this.dataService.getAppointment('appointments/' + this.appointmentId).subscribe(appointment => {
        appointment.consultDate = this.dataTransformService.transformDateForForm(appointment.consultDate);

        this.appointRegistration.patchValue(appointment);
      })
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
    this.appointRegistration.patchValue({
      idPatient: patient.id,
      name: patient.name
    })
    this.filteredPatients = [];
  }
  
  appointRegister() {
    const idPatientValue = this.appointRegistration.getRawValue().idPatient;
    const nameValue = this.appointRegistration.getRawValue().name;

    if (!this.appointRegistration.valid || !idPatientValue || !nameValue) {
      this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    if (this.appointRegistration.valid) {
        
        const newAppointment: Appointment = {
          id: this.appointRegistration.getRawValue().idPatient,
          reason: this.appointRegistration.value.reason,
          consultDate: this.dataTransformService.formatDate(this.appointRegistration.value.consultDate),
          consultTime: this.appointRegistration.value.consultTime,
          problemDescrip: this.appointRegistration.value.problemDescrip,
          prescMed: this.appointRegistration.value.prescMed,
          dosagesPrec: this.appointRegistration.value.dosagesPrec,
        }

        this.dataService.saveAppointment(newAppointment).subscribe({
          next: (response) => {
            console.log('Appointment saved successfully:', response);
            this.showMessage = true;
            this.appointRegistration.reset();
            this.setCurrentTimeAndDate();

          setTimeout(() => {
            this.showMessage = false;
          }, 1000);
        },
        error: (error) => {
          console.error('Error saving appointment:', error);
        }
      });
      
    } else {
      this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
    }
  }

}
