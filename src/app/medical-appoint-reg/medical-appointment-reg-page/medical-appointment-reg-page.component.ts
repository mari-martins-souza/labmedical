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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@Component({
  selector: 'app-medical-appointment-reg-page',
  standalone: true,
  imports: [ToolbarComponent, SidebarMenuComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule, CommonModule, NgxMaterialTimepickerModule],
  providers: [DataTransformService],
  templateUrl: './medical-appointment-reg-page.component.html',
  styleUrl: './medical-appointment-reg-page.component.scss'
})
export class MedicalAppointmentRegPageComponent implements OnInit {

  constructor(private dataTransformService: DataTransformService, private titleService: Title, private fb: FormBuilder) { }
  
  appointRegistration = this.fb.group({
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
  }
  
  }
  

// saveAppointRegister() {
//   if (this.appointRegistration.valid) {
      
//       const patient = {
//         reason: this.appointRegistration.value.reason,
//         consultDate: this.appointRegistration.value.consultDate,
//         consultTime: this.appointRegistration.value.consultTime,
//         problemDescrip: this.appointRegistration.value.problemDescrip,
//         prescMed: this.appointRegistration.value.prescMed,
//         dosagesPrec: this.appointRegistration.value.dosagesPrec,
//       }
// }

// }


