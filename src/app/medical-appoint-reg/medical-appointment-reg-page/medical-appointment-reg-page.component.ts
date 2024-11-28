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
import { SaveDialogComponent } from '../../shared/save-dialog/save-dialog.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-medical-appointment-reg-page',
  standalone: true,
  imports: [ToolbarComponent, SidebarMenuComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatButtonModule, MatButton, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule, HttpClientModule, MatAutocompleteModule, DialogComponent, ConfirmDialogComponent, SaveDialogComponent],
  providers: [DataTransformService, DataService],
  templateUrl: './medical-appointment-reg-page.component.html',
  styleUrl: './medical-appointment-reg-page.component.scss'
})
export class MedicalAppointmentRegPageComponent implements OnInit {
  appointmentId: any = '';
  patients: any[] = [];
  filteredPatients: Patient[] = [];
  patientSearchControl = new FormControl();
  isEditing: boolean = false;
  saveDisabled: boolean = false;
  appointRegistration: FormGroup;
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  totalPatients: number = 0;
  noResults: boolean = false;

  constructor(
    private dataTransformService: DataTransformService, 
    private titleService: Title, 
    private fb: FormBuilder, 
    private dataService: DataService, 
    private activatedRoute: ActivatedRoute, 
    private router: Router,
  ) {
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
  @ViewChild(SaveDialogComponent) saveDialog!: SaveDialogComponent;

  matcher = new MyErrorStateMatcher()

  setDate(date: Date) {
    let d = new Date(date);
    d.setHours(d.getHours());
    return d;
  }
    
  ngOnInit() {
    this.titleService.setTitle('Registro de Consulta');
    this.appointmentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getAppointmentData();
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

  getPatientsBySearchTerm(searchTerm: string, page: number, size: number): void {
    this.dataService.getPatients(searchTerm, 'name', page, size).subscribe({
      next: (response: any) => {
        this.filteredPatients = response.content;
        this.totalPatients = response.totalElements; 
        
        if (this.totalPatients === 0) {
          this.noResults = true;
          console.log(this.noResults);
          this.filteredPatients = []; 
        } else {
          this.noResults = false; 
        }
  
        this.totalPages = Math.ceil(this.totalPatients / this.pageSize); 
        console.log('Successfully loaded patients:', this.filteredPatients);
      },
      error: (error) => {
        console.error('Error when searching for patients:', error);
        this.noResults = true;
      }
    });
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  onSearch() {
    const searchTerm = this.patientSearchControl.value?.trim();
    console.log('Searching for:', searchTerm);
    
    if (searchTerm && searchTerm.length > 0) {
      this.getPatientsBySearchTerm(searchTerm, this.currentPage, this.pageSize);
    } else {
      this.filteredPatients = [];
      this.totalPatients = 0;
      this.noResults = true;
      console.log(this.noResults);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      const searchTerm = this.patientSearchControl.value?.trim();
      if (searchTerm) {
        this.getPatientsBySearchTerm(searchTerm, this.currentPage, this.pageSize);
      }
    }
  }
  
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      const searchTerm = this.patientSearchControl.value?.trim();
      if (searchTerm) {
        this.getPatientsBySearchTerm(searchTerm, this.currentPage, this.pageSize);
      }
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
            this.saveDialog.openDialog("Consulta criada com sucesso!")
            this.appointRegistration.reset();
            this.setCurrentTimeAndDate();

        },
        error: (error) => {
          console.error('Error saving appointment:', error);
        }
      });
      
    } else {
      this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
    }
  }

  getAppointmentData() {
    if (this.appointmentId) {
      this.dataService.getAppointment(this.appointmentId).subscribe({
        next: (appointment: Appointment) => {
          this.appointRegistration.patchValue({
            idPatient: appointment.id,
            name: appointment.patientName,
            reason: appointment.reason,
            consultDate: appointment.consultDate,
            consultTime: appointment.consultTime,
            problemDescrip: appointment.problemDescrip,
            prescMed: appointment.prescMed,
            dosagesPrec: appointment.dosagesPrec,
        });
      },
        error: (error) => {
          console.error('Error when fetching appointment data:', error);
        },
        complete: () => {
          console.log('Appointment search completed.');
        }
      });
    } else {
      this.setCurrentTimeAndDate();
    }
  }

  saveEditAppoint() {
    this.appointRegistration.enable();
    this.saveDisabled = false;

    if (this.appointRegistration.valid) {

      const newAppointment: Appointment = {
        id: this.appointRegistration.getRawValue().idPatient,
          reason: this.appointRegistration.value.reason,
          consultDate: this.appointRegistration.value.consultDate,
          consultTime: this.appointRegistration.value.consultTime,
          problemDescrip: this.appointRegistration.value.problemDescrip,
          prescMed: this.appointRegistration.value.prescMed,
          dosagesPrec: this.appointRegistration.value.dosagesPrec,
      };

      this.dataService.editAppointment(this.appointmentId, newAppointment).subscribe({
        next: (response) => {
          console.log('Appointment updated successfully:', response);
          this.saveDialog.openDialog('Consulta atualizada com sucesso!')
          this.appointRegistration.disable();
          this.saveDisabled = true;
      
        },
        error: (error) => {
          console.error('Error updating appointment:', error);
        
        }
      });
    } else {
      this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
    }
  }

  editAppoint(){
    this.appointRegistration.enable();
    this.saveDisabled = false;
  }

  deleteAppointment(id: string) {
    this.confirmDialog.openDialog("Tem certeza que deseja excluir a consulta? Essa ação não pode ser desfeita.");
  
    const subscription = this.confirmDialog.confirm.subscribe(result => {
      if (result) {
        this.dataService.deleteAppointment(id).subscribe({
          next: () => {
            this.router.navigate(['/lista-prontuarios']); 
            subscription.unsubscribe(); 
          },
          error: (error) => {
            console.error('Error deleting appointment:', error); 
          }
        });
      } else {
        subscription.unsubscribe(); 
      }
    });
  }

}
