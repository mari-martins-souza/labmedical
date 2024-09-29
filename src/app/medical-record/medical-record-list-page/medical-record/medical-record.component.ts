import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../../../shared/services/data.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { SliderComponent } from './slider/slider.component';
import { PatientRecord } from '../../../models/patient-record.model';
import { AppointmentRecord } from '../../../models/appointment-record.model';
import { ExamRecord } from '../../../models/exam-record.model';
import moment from 'moment';
import { TimeFormatPipe } from '../../../shared/pipes/time-format.pipe';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [SidebarMenuComponent, ToolbarComponent, HttpClientModule, MatTabsModule, MatDividerModule, CommonModule, RouterLink, MatButton, MatButtonModule, DateFormatPipe, SliderComponent, TimeFormatPipe],
  providers: [DataService],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.scss'
})
export class MedicalRecordComponent implements OnInit {
  patientID: any = '';
  patient: PatientRecord | undefined = undefined;
  appointment: AppointmentRecord | undefined = undefined;
  exam: ExamRecord | undefined = undefined;
  patientsList: any = [];
  appointmentsList: AppointmentRecord[] = [];
  examsList: ExamRecord[] = [];

  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Prontuário de paciente');
  
    this.patientID = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.patientID);

    this.getPatient(this.patientID);
    this.getAppointments(this.patientID);
    this.getExams(this.patientID);

    this.patient = {
      id: '',
      name: '',
      emergCont: '',
      emergContNumber: '',
      listOfAllergies: null,
      careList: null,
      healthInsurance: '',
      appointments: [],
      exams: []
    };

    this.appointment = {
      id: '',
      appointment_id: '',
      patientName: '',
      reason: '',
      consultDate: '',
      consultTime: '',
      problemDescrip: '',
      prescMed: null,
      dosagesPrec: null,
    }

    this.exam = {
      id: '',
      examId: '',
      patientName: '',
      exam: '',
      examDate: '', 
      examTime: '', 
      examType: '', 
      lab: '', 
      docUrl: null,
      result: '',
    }

  }

  getPatient(id: string) {
    this.dataService.getPatientById(this.patientID).subscribe({
      next: (response) => {
        this.patient = response;
        console.log('Patient loaded successfully:', this.patient);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading patient:', error);
      }
    });
  }

  getAppointments(id: string) {
    this.dataService.getAppointmentsAndExamsByPatientId(this.patientID).subscribe({
      next: (response: any) => {
        this.appointmentsList = response.appointments;
        console.log('Appointments loaded successfully:', this.appointmentsList);

        this.appointmentsList.sort((a, b) => {
          const dateA = moment(a.consultDate + ' ' + a.consultTime, 'YYYY-MM-DD HH:mm:ss');
          const dateB = moment(b.consultDate + ' ' + b.consultTime, 'YYYY-MM-DD HH:mm:ss');
          return dateB.diff(dateA);
        });

      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading appointments:', error);
      }
    });
  }

  getExams(id: string) {
    this.dataService.getAppointmentsAndExamsByPatientId(this.patientID).subscribe({
      next: (response: any) => {
        this.examsList = response.exams;
        console.log('Exams loaded successfully:', this.examsList);

        this.examsList.sort((a, b) => {
          const dateA = moment(a.examDate + ' ' + a.examTime, 'YYYY-MM-DD HH:mm:ss');
          const dateB = moment(b.examDate + ' ' + b.examTime, 'YYYY-MM-DD HH:mm:ss');
          return dateB.diff(dateA);
        });

      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading exams:', error);
      }
    });
  }







  editAppointment(id: string) {
    this.router.navigate(['/registro-consulta', id]);
  }

  editExam(id: string) {
    this.router.navigate(['/registro-exame', id]);
  }

  editPatient(id: string) {
    this.router.navigate(['/registro-paciente', id]);
  }

}
