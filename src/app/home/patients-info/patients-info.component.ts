import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AgePipe } from "../../shared/pipes/age.pipe";
import { Router } from '@angular/router';
import { ShortenNamePipe } from '../../shared/pipes/shorten-name.pipe';
import { Page } from '../../models/page.interface';
import { PatientCard } from '../../models/patient-card.model';

@Component({
    selector: 'app-patients-info',
    standalone: true,
    providers: [DataService],
    templateUrl: './patients-info.component.html',
    styleUrl: './patients-info.component.scss',
    imports: [MatCardModule, FormsModule, HttpClientModule, MatInputModule, MatButtonModule, MatButton, CommonModule, AgePipe, ShortenNamePipe]
})
export class PatientsInfoComponent implements OnInit {
  patientID: any = '';
  dashboardPatientsCard: PatientCard[] = [];
  patientsList: any = [];
  searchTerm: string = '';
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 12;
  hasMorePages: boolean = false;
  noResults: boolean = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getPatients(this.currentPage);
  }

  getPatients(page: number, name?: string): void {
    this.dataService.getPatientsCard(page, this.pageSize, name).subscribe({
        next: (response: Page<PatientCard>) => {
            this.patientsList = response.content;
            this.dashboardPatientsCard = this.patientsList;

            if (this.patientsList.length === 0) {
                this.noResults = true;
                this.dashboardPatientsCard = [];
            } else {
                this.noResults = false;
            }

            this.totalPages = response.totalPages;
            this.hasMorePages = this.currentPage < this.totalPages - 1;
            console.log('Patients loaded successfully:', this.dashboardPatientsCard);
        },
        error: (error: HttpErrorResponse) => {
            console.error('Error loading patients:', error);
            this.noResults = true;
            this.dashboardPatientsCard = [];
        }
    });
}


  goToPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getPatients(this.currentPage);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getPatients(this.currentPage);
    }
  }

  isPreviousDisabled(): boolean {
    return this.currentPage === 0;
  }

  isNextDisabled(): boolean {
    return this.currentPage >= this.totalPages - 1;
  }

  search(): void {
    this.getPatients(this.currentPage, this.searchTerm);
}

clearSearch(): void {
    this.searchTerm = '';
    this.getPatients(this.currentPage);
}
  

  editPatient(id: string) {
    this.router.navigate(['/registro-paciente', id]);
  }

}
