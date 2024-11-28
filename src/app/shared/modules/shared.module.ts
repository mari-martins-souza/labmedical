import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRecordListPageComponent } from '../../medical-record/medical-record-list-page/medical-record-list-page.component';
import { MedicalRecordComponent } from '../../medical-record/medical-record-list-page/medical-record/medical-record.component';
import { roleGuard } from '../guards/role-guard';

const routes: Routes = [
  { 
    path: '', 
    component: MedicalRecordListPageComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN'] }  
  }, 
  { 
    path: ':id', 
    component: MedicalRecordComponent,
    canActivate: [roleGuard],
    data: { expectedRoles: ['ROLE_MEDICO', 'ROLE_ADMIN', 'ROLE_PACIENTE'] } 
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SharedModule { }
