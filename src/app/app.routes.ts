import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { PatientRegistrationPageComponent } from './patient-registration/patient-registration-page/patient-registration-page.component';
import { MedicalAppointmentRegPageComponent } from './medical-appoint-reg/medical-appointment-reg-page/medical-appointment-reg-page.component';
import { ExamRegisterPageComponent } from './exam-register/exam-register-page/exam-register-page.component';
import { authGuard } from './shared/guards/auth.guard';
import { authChildGuard } from './shared/guards/auth-child.guard';
import { UserRegisterComponent } from './user-register/user-register.component';
import { roleGuard } from './shared/guards/role-guard';

export const routes: Routes = [
    { 
        path: '', 
        component: LoginPageComponent, 
    },
    { 
        path: 'home', 
        component: HomePageComponent, 
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN', 'ROLE_PACIENTE'] } 
    },
    { 
        path: 'registro-usuario', 
        component: UserRegisterComponent, 
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ROLE_ADMIN'] } 
    },
    { 
        path: 'registro-paciente/:id', 
        component: PatientRegistrationPageComponent, 
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN'] } 
    },
    { 
        path: 'registro-paciente',
        component: PatientRegistrationPageComponent, 
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN'] } 
    },
    { 
        path: 'registro-consulta/:id', 
        component: MedicalAppointmentRegPageComponent, 
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN'] } 
    },
    { 
        path: 'registro-consulta', 
        component: MedicalAppointmentRegPageComponent, 
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN'] }  
    },
    { 
        path: 'registro-exame/:id', 
        component: ExamRegisterPageComponent, 
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN'] }  
    },
    { 
        path: 'registro-exame', 
        component: ExamRegisterPageComponent, 
        canActivate: [authGuard, roleGuard],
        data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN'] }  
    },
    { 
        path: 'lista-prontuarios',
        canActivateChild: [authChildGuard, roleGuard],
        data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN'] },
        loadChildren:    
        () => import('../app/shared/modules/shared.module').then(m => m.SharedModule)
    },
];
