import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MedicalRecordListPageComponent } from '../../medical-record/medical-record-list-page/medical-record-list-page.component';
import { MedicalRecordComponent } from '../../medical-record/medical-record-list-page/medical-record/medical-record.component';

const routes: Routes = [
  { path: '', component: MedicalRecordListPageComponent }, 
  { path: ':id', component: MedicalRecordComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SharedModule { }
