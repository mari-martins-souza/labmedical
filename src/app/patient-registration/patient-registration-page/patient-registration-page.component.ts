import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule, MatButton} from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-patient-registration-page',
  standalone: true,
  imports: [SidebarMenuComponent, ToolbarComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule],
  templateUrl: './patient-registration-page.component.html',
  styleUrl: './patient-registration-page.component.scss'
})
export class PatientRegistrationPageComponent implements OnInit {
  patRegistration = new FormGroup({
    name: new FormControl('',),
    gender: new FormControl('',),
    cpf: new FormControl('',),
    rg: new FormControl('',),
    issOrg: new FormControl('',),
    maritalStatus: new FormControl('',),
    phone: new FormControl('',),
    placeOfBirth: new FormControl('',),
    emergCont: new FormControl('',),
    emergContNumber: new FormControl('',),
    listOfAllergies: new FormControl('',),
    careList: new FormControl('',),
    healthInsurance: new FormControl('',),
    healthInsuranceNumber: new FormControl('',),
    healthInsuranceVal: new FormControl('',),
    zipcode: new FormControl('',),
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
