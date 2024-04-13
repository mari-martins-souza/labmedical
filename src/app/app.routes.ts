import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { PatientRegistrationPageComponent } from './patient-registration/patient-registration-page/patient-registration-page.component';
import { MedicalAppointmentRegPageComponent } from './medical-appoint-reg/medical-appointment-reg-page/medical-appointment-reg-page.component';

export const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'registro-paciente', component: PatientRegistrationPageComponent },
    { path: 'registro-consulta', component: MedicalAppointmentRegPageComponent },
];
