import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../../shared/services/data.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [SidebarMenuComponent, ToolbarComponent, HttpClientModule, MatTabsModule, MatDividerModule, CommonModule],
  providers: [DataService],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.scss'
})
export class MedicalRecordComponent implements OnInit {
  patientID: any = '';
  patientsList: any = [];
  appointmentsList: any = [];
  examsList: any = [];

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.titleService.setTitle('Prontuário de paciente');
  
    this.patientID = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.dataService.getData('patients').subscribe((data: any) => {
      this.patientsList = data.filter((patient: { id: any; }) => patient.id === this.patientID);
    });
  
    function convertDateFormat(date: string): string {
      const [day, month, year] = date.split('-');
      return `${month}-${day}-${year}`;
    }
    
    this.dataService.getData('appointments').subscribe((data: any) => {
      this.appointmentsList = data.filter((appointment: { id: any; }) => appointment.id === this.patientID);
      this.appointmentsList.sort((a: any, b: any) => {
        const aDate = convertDateFormat(a.consultDate);
        const bDate = convertDateFormat(b.consultDate);
        return new Date(bDate + ' ' + b.consultTime).getTime() - new Date(aDate + ' ' + a.consultTime).getTime();
      });
    });
    
    this.dataService.getData('exams').subscribe((data: any) => {
      this.examsList = data.filter((exam: { id: any; }) => exam.id === this.patientID);
      this.examsList.sort((a: any, b: any) => {
        const aDate = convertDateFormat(a.examDate);
        const bDate = convertDateFormat(b.examDate);
        return new Date(bDate + ' ' + b.examTime).getTime() - new Date(aDate + ' ' + a.examTime).getTime();
      });
    });
    
  }
  
  
    
}


