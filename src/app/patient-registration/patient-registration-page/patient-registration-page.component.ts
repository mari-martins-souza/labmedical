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
import { DataService } from '../../shared/services/data.service';
import { DataTransformService } from '../../shared/services/data-transform.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-registration-page',
  standalone: true,
  imports: [SidebarMenuComponent, ToolbarComponent, MatFormFieldModule, MatInputModule, MatSelectModule, MatFormField, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatButton, ReactiveFormsModule, NgxMaskDirective, NgxMaskPipe, HttpClientModule, CommonModule],
  providers: [provideNgxMask(), AddressService, DataService, DataTransformService],
  templateUrl: './patient-registration-page.component.html',
  styleUrl: './patient-registration-page.component.scss'
})
export class PatientRegistrationPageComponent implements OnInit {
  showMessage = false;
  
  constructor(private dataTransformService: DataTransformService, private dataService: DataService, private titleService: Title, private addressService: AddressService, private fb: FormBuilder) { }

  patRegistration = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]],
    gender: ['', Validators.required],
    birthdate: ['', Validators.required],
    cpf: ['', Validators.required],
    rg: ['', [Validators.required, Validators.maxLength(20)]],
    issOrg: ['', Validators.required],
    maritalStatus: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.email],
    placeOfBirth: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
    emergCont: ['', Validators.required],
    emergContNumber: ['', Validators.required],
    listOfAllergies: [''],
    careList: [''],
    healthInsurance: ['',Validators.required],
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
        
        const patient = {
          name: this.patRegistration.value.name,
          gender: this.patRegistration.value.gender,
          birthdate: this.dataTransformService.formatDate(this.patRegistration.value.birthdate),
          cpf: this.dataTransformService.formatCpf(this.patRegistration.value.cpf),
          rg: this.patRegistration.value.rg,
          issOrg: this.patRegistration.value.issOrg,
          maritalStatus: this.patRegistration.value.maritalStatus,
          phone: this.dataTransformService.formatPhone(this.patRegistration.value.phone),
          email: this.patRegistration.value.email,
          placeOfBirth: this.patRegistration.value.placeOfBirth,
          emergCont: this.patRegistration.value.emergCont,
          emergContNumber: this.dataTransformService.formatPhone(this.patRegistration.value.emergContNumber),
          listOfAllergies: this.patRegistration.value.listOfAllergies,
          careList: this.patRegistration.value.careList,
          healthInsurance: this.patRegistration.value.healthInsurance,
          healthInsuranceNumber: this.patRegistration.value.healthInsuranceNumber,
          healthInsuranceVal: this.dataTransformService.formatDate(this.patRegistration.value.healthInsuranceVal),
          zipcode: this.patRegistration.value.zipcode,
          street: this.patRegistration.value.street,
          addressNumber: this.patRegistration.value.addressNumber,
          complement: this.patRegistration.value.complement,
          referencePoint: this.patRegistration.value.referencePoint,
          neighborhood: this.patRegistration.value.neighborhood,
          city: this.patRegistration.value.city,
          state: this.patRegistration.value.state,
        }

        this.dataService.saveData('patients', patient).subscribe(() => {
          this.showMessage = true;

          this.patRegistration.reset();

          setTimeout(() => {
            this.showMessage = false;
          }, 1000);
      
    });
  } else {
    window.alert('Preencha todos os campos obrigatórios corretamente.')
  }
}

}