import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DashboardStats } from '../../models/dashboard-stats.interface';

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

  ngOnInit(): void {
    this.getDashboardStats();
  }
    
  getDashboardStats(): void {
    this.dataService.getDashboardStats().subscribe({
      next: (stats: DashboardStats) => {
        this.countPatients = stats.totalPatients;
        this.countAppointments = stats.totalAppointments;
        this.countExams = stats.totalExams;
        console.log('Dashboard stats loaded successfully:', stats);
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    });
  }
}