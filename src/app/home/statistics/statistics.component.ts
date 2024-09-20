import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatCardModule, HttpClientModule, CommonModule],
  providers: [DataService],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
    countPatients: number = 0;
    countAppointments: number = 0;
    countExams: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.countData('patients').subscribe(num => this.countPatients = num);
    this.dataService.countData('appointments').subscribe(num => this.countAppointments = num);
    this.dataService.countData('exams').subscribe(num => this.countExams = num);
  }
}