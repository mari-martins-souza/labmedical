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

@Component({
  selector: 'app-medical-appointment-reg-page',
  standalone: true,
  imports: [ToolbarComponent, SidebarMenuComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule, HttpClientModule, MatAutocompleteModule],
  providers: [DataTransformService, DataService],
  templateUrl: './medical-appointment-reg-page.component.html',
  styleUrl: './medical-appointment-reg-page.component.scss'
})
export class MedicalAppointmentRegPageComponent implements OnInit {
  showMessage = false;
  patients: any[] = [];
  filteredPatients: Observable<any[]> | undefined;
  patientSearchControl = new FormControl();

  constructor(private dataTransformService: DataTransformService, private titleService: Title, private fb: FormBuilder, private dataService: DataService) { }
  
  appointRegistration = this.fb.group({
    id: ['',Validators.required],
    name: ['',Validators.required],
    reason: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    consultDate: ['',Validators.required],
    consultTime: ['',Validators.required],
    problemDescrip: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(1024)]],
    prescMed: ['',],
    dosagesPrec: ['',[Validators.required, Validators.minLength(16), Validators.maxLength(256)]],
  })
    
  ngOnInit() {

    this.titleService.setTitle('Registro de Consulta');
    
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0];
    const timeString = currentDate.getHours() + ':' + currentDate.getMinutes();
  
    this.appointRegistration.patchValue({
      consultDate: dateString,
      consultTime: timeString,
    });   
    
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
      id: patient.id,
      name: patient.name
    });
    this.patientSearchControl.setValue('');
  }
  
  saveAppointRegister() {
    if (this.appointRegistration.valid) {
        
        const appointment = {
          id: this.appointRegistration.value.id,
          name: this.appointRegistration.value.name,
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
    window.alert('Preencha todos os campos obrigatórios corretamente.')

    }
  }  
  
}
