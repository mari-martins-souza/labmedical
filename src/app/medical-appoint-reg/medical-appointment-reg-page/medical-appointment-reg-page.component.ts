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
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

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
  patients: any[] = [];
  filteredPatients: Observable<any[]> | undefined;
  patientSearchControl = new FormControl();
  appointmentId: any = '';
  isEditing: boolean = false;
  saveDisabled: boolean = false;

  constructor(private dataTransformService: DataTransformService, private titleService: Title, private fb: FormBuilder, private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.isEditing = !!this.activatedRoute.snapshot.paramMap.get('id')
   }

   @ViewChild(DialogComponent) dialog!: DialogComponent;
   @ViewChild(ConfirmDialogComponent) confirmDialog!: ConfirmDialogComponent;

   matcher = new MyErrorStateMatcher()
  
  appointRegistration = this.fb.group({
    idPatient: [{value: '', disabled: true}, Validators.required],
    name: [{value: '', disabled: true}, Validators.required],
    reason: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    consultDate: ['',Validators.required],
    consultTime: ['',Validators.required],
    problemDescrip: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(1024)]],
    prescMed: ['',],
    dosagesPrec: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(256)]],
  })

  setDate(date: Date) {
    let d = new Date(date);
    d.setHours(d.getHours());
    return d;
  }
    
  ngOnInit() {

    this.titleService.setTitle('Registro de Consulta');

    this.appointmentId = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.appointmentId) {
      this.dataService.getData('appointments/' + this.appointmentId).subscribe(appointment => {
        appointment.consultDate = this.dataTransformService.transformDateForForm(appointment.consultDate);

        this.appointRegistration.patchValue(appointment);
      })
    } else {
      const currentDate = this.setDate(new Date());

      const dateString = moment(currentDate).format('YYYY-MM-DD');
      const timeString = moment(currentDate).format('HH:mm');

      this.appointRegistration.patchValue({
        consultDate: dateString,
        consultTime: timeString,
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
    this.appointRegistration.patchValue({
      idPatient: patient.id,
      name: patient.name
    });
    this.patientSearchControl.setValue('');
  }
  
  saveAppointRegister() {
    if (this.appointRegistration.valid) {
        
        const appointment = {
          idPatient: this.appointRegistration.getRawValue().idPatient,
          name: this.appointRegistration.getRawValue().name,
          reason: this.appointRegistration.value.reason,
          consultDate: this.dataTransformService.formatDate(this.appointRegistration.value.consultDate),
          consultTime: this.appointRegistration.value.consultTime,
          problemDescrip: this.appointRegistration.value.problemDescrip,
          prescMed: this.appointRegistration.value.prescMed,
          dosagesPrec: this.appointRegistration.value.dosagesPrec,
        }

        this.dataService.saveData('appointments', appointment).subscribe(() => {
          this.showMessage = true;

          setTimeout(() => {
            this.showMessage = false;
          }, 1000);

          const consultDateControl = this.appointRegistration.get('consultDate');
          const consultTimeControl = this.appointRegistration.get('consultTime');

          if (consultDateControl && consultTimeControl) {
            this.appointRegistration.reset({
              consultDate: consultDateControl.value,
              consultTime: consultTimeControl.value
          });
  }
    });
  } else {
    this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');

    }
  }  

  saveEditAppoint() {
    if (this.appointRegistration.valid) {
      const appointment = {
        id: this.appointmentId,
        idPatient: this.appointRegistration.getRawValue().idPatient,
        name: this.appointRegistration.getRawValue().name,
        reason: this.appointRegistration.value.reason,
        consultDate: this.dataTransformService.formatDate(this.appointRegistration.value.consultDate),
        consultTime: this.appointRegistration.value.consultTime,
        problemDescrip: this.appointRegistration.value.problemDescrip,
        prescMed: this.appointRegistration.value.prescMed,
        dosagesPrec: this.appointRegistration.value.dosagesPrec,
      }
  
      this.dataService.editData('appointments', this.appointmentId, appointment).subscribe(() => {
        this.showMessage = true;
        this.appointRegistration.disable();
        this.saveDisabled = true;
  
        setTimeout(() => {
          this.showMessage = false;
        }, 1000);
  
      });
    } else {
      this.dialog.openDialog('Preencha todos os campos obrigatórios corretamente.');
    }
  }

  editAppoint(){
    this.appointRegistration.enable();

    this.appointRegistration.get('idPatient')!.disable();
    this.appointRegistration.get('name')!.disable();

    this.saveDisabled = false;
  }

  deleteAppoint(){
    this.confirmDialog.openDialog("Tem certeza que deseja excluir a consulta? Essa ação não pode ser desfeita.")
    const subscription = this.confirmDialog.confirm.subscribe(result => {
      if (result) {
        this.dataService.deleteData('appointments', this.appointmentId).subscribe(() => {
          this.router.navigate(['/lista-prontuarios']);
          subscription.unsubscribe();
        });
      } else {
        subscription.unsubscribe();
      }
    });
  }
}
