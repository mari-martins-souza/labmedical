import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask, NgxMaskPipe } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-patient-registration-page',
  standalone: true,
  imports: [SidebarMenuComponent, ToolbarComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, HttpClientModule],
  providers: [provideNgxMask(), AddressService],
  templateUrl: './patient-registration-page.component.html',
  styleUrl: './patient-registration-page.component.scss'
})
export class PatientRegistrationPageComponent implements OnInit {
  
  constructor(private titleService: Title, private addressService: AddressService, private fb: FormBuilder) { }

  patRegistration = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    gender: ['', Validators.required],
    birthday: ['', Validators.required],
    cpf: ['', Validators.required],
    rg: ['', [Validators.required, Validators.maxLength(20)]],
    issOrg: ['', Validators.required],
    maritalStatus: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.email],
    placeOfBirth: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    emergCont: ['', Validators.required],
    emergContNumber: ['', Validators.required],
    listOfAllergies: [''],
    careList: [''],
    healthInsurance: [''],
    healthInsuranceNumber: [''],
    healthInsuranceVal: [''],
    zipcode: ['', Validators.required],
    street: [''],
    addressNumber: [''],
    complement: [''],
    referencePoint: [''],
    neighborhood: [''],
    city: [''],
    state: [''],
  })
  
  ngOnInit() {
    this.titleService.setTitle('Registro de Pacientes');
   
    const zipcodeControl = this.patRegistration.get('zipcode');
  if (zipcodeControl) {
    zipcodeControl.valueChanges.subscribe(zipcode => {
      if (zipcode && zipcode.length === 8) {
        this.searchZipcode(zipcode);
      }
    });
  }
}

  searchZipcode(zipcode: string) {
    this.addressService.getCep(zipcode).subscribe(data => {
      this.patRegistration.patchValue({
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      });
    });
  }

  savePatRegister() {
    if (this.patRegistration.valid) {
        let patients = [];
        const databasePatients = localStorage.getItem('databasePatients');
        if (databasePatients !== null) {
          patients = JSON.parse(databasePatients);
        }
        const patient = {
          name: this.patRegistration.value.name,
          gender: this.patRegistration.value.gender,
          birthday: this.patRegistration.value.birthday,
          cpf: this.patRegistration.value.cpf,
          rg: this.patRegistration.value.rg,
          issOrg: this.patRegistration.value.issOrg,
          maritalStatus: this.patRegistration.value.maritalStatus,
          phone: this.patRegistration.value.phone,
          email: this.patRegistration.value.email,
          placeOfBirth: this.patRegistration.value.placeOfBirth,
          emergCont: this.patRegistration.value.emergCont,
          emergContNumber: this.patRegistration.value.emergContNumber,
          listOfAllergies: this.patRegistration.value.listOfAllergies,
          careList: this.patRegistration.value.careList,
          healthInsurance: this.patRegistration.value.healthInsurance,
          healthInsuranceNumber: this.patRegistration.value.healthInsuranceNumber,
          healthInsuranceVal: this.patRegistration.value.healthInsuranceVal,
          zipcode: this.patRegistration.value.zipcode,
          street: this.patRegistration.value.street,
          addressNumber: this.patRegistration.value.addressNumber,
          complement: this.patRegistration.value.complement,
          referencePoint: this.patRegistration.value.referencePoint,
          neighborhood: this.patRegistration.value.neighborhood,
          city: this.patRegistration.value.city,
          state: this.patRegistration.value.state,
        }
        patients.push(patient);
        localStorage.setItem('databasePatients', JSON.stringify(patients));
        window.alert('Paciente registrado com sucesso.')
        
      } else {
        window.alert('Preencha todos os campos obrigatórios corretamente.')
    }
  }

}