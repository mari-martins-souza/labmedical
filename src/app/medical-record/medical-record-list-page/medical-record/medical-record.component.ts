import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'app-medical-record',
  standalone: true,
  imports: [SidebarMenuComponent, ToolbarComponent, HttpClientModule],
  providers: [DataService],
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.scss'
})
export class MedicalRecordComponent implements OnInit {
  patientsList: any = [];
  patientID: any = '';
  patientName: string = '';
  patientInsurance: string = '';
  patientAllergies: string = '';
  patientEmergCont: string = '';
  patientEmergContNum: string = '';
  patientCare: string = '';

  appointmentsList: any = [];
  appointReason: string = '';
  appointData: string = '';
  appointTime: string = '';
  appointProb: string = '';
  appointPresc: string = '';
  appointdosages: string = '';

  examsList: any = [];
  examName: string = '';
  examDat: string = '';
  examTim: string = '';
  examTyp: string = '';
  examLab: string = '';
  examDoc: string = '';
  examResult: string = '';


  constructor(private titleService: Title, private activatedRoute: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {

    this.titleService.setTitle('Prontuário de paciente');

    this.patientID = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getData('patients').subscribe((data: any) => {
      this.patientsList = data;
      const patient = this.patientsList.find((patient: { id: any; }) => patient.id === this.patientID);
      this.patientName = patient.name;
      this.patientAllergies = patient.listOfAllergies;
      this.patientInsurance = patient.healthInsurance;
      this.patientEmergCont = patient.emergCont;
      this.patientEmergContNum = patient.emergContNumber;
      this.patientCare = patient.careList;
    });

      this.dataService.getData('appointments').subscribe((data: any) => {
      this.appointmentsList = data;
      const appointment = this.appointmentsList.find((appointment: { id: any; }) => appointment.id === this.patientID);
      this.appointReason = appointment.reason;
      this.appointData = appointment.consultDate;
      this.appointTime = appointment.consultTime;
      this.appointProb = appointment.problemDescrip;
      this.appointPresc = appointment.prescMed;
      this.appointdosages = appointment.dosagesPrec;
    });

      this.dataService.getData('exams').subscribe((data: any) => {
      this.examsList = data;
      const exam = this.examsList.find((exam: { id: any; }) => exam.id === this.patientID);
      this.examName = exam.exam;
      this.examDat = exam.examData;
      this.examTim = exam.examTime;
      this.examTyp = exam.examType;
      this.examLab = exam.lab;
      this.examDoc = exam.docUrl;
      this.examResult = exam.result;
    });
  
    
}

}
