import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule, MatButton} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-patient-registration-page',
  standalone: true,
  imports: [SidebarMenuComponent, ToolbarComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe],
  providers: [provideNgxMask()],
  templateUrl: './patient-registration-page.component.html',
  styleUrl: './patient-registration-page.component.scss'
})
export class PatientRegistrationPageComponent implements OnInit {
  cpfFormat = '';

  patRegistration = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(64)]),
    gender: new FormControl('',Validators.required),
    birthday: new FormControl('',Validators.required),
    cpf: new FormControl('',Validators.required),
    rg: new FormControl('',[Validators.required,Validators.maxLength(20)]),
    issOrg: new FormControl('',Validators.required),
    maritalStatus: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    placeOfBirth: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(64)]),
    emergCont: new FormControl('',Validators.required),
    emergContNumber: new FormControl('',Validators.required),
    listOfAllergies: new FormControl('',),
    careList: new FormControl('',),
    healthInsurance: new FormControl('',),
    healthInsuranceNumber: new FormControl('',),
    healthInsuranceVal: new FormControl('',),
    zipcode: new FormControl('',Validators.required),
    street: new FormControl('',),
    addressNumber: new FormControl('',),
    complement: new FormControl('',),
    referencePoint: new FormControl('',),
    neighborhood: new FormControl('',),
    city: new FormControl('',),
    state: new FormControl('',),
  })

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Registro de Pacientes');
  }
}
