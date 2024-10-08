import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../shared/services/data.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ListPatients } from '../../models/list-patients.model';
import { Page } from '../../models/page.interface';
import { ShortenIdPipe } from '../../shared/pipes/shorten-id.pipe';

@Component({
  selector: 'app-medical-record-list-page',
  standalone: true,
  imports: [SidebarMenuComponent, ToolbarComponent, HttpClientModule, CommonModule, FormsModule, RouterModule, ShortenIdPipe],
  providers: [DataService],
  templateUrl: './medical-record-list-page.component.html',
  styleUrl: './medical-record-list-page.component.scss'
})
export class MedicalRecordListPageComponent implements OnInit {
  medicalRecordPatientsList: ListPatients[] = [];
  filteredPatientsList: any = [];
  searchTerm: string = '';
  patientsList: any = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  hasMorePages: boolean = false;

  constructor(private titleService: Title, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Lista de prontuários');
    this.getPatients(this.currentPage);
  }

  getPatients(page: number): void {
    this.dataService.listPatients(page, this.pageSize).subscribe({
        next: (response: Page<ListPatients>) => {
            this.medicalRecordPatientsList = response.content;
            this.totalPages = response.totalPages;
            this.hasMorePages = this.currentPage < this.totalPages - 1;
            console.log('Patients loaded successfully:', this.medicalRecordPatientsList);
        },
        error: (error: HttpErrorResponse) => {
            console.error('Error loading patients:', error);
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

  search() {
    if (this.searchTerm) {
      this.filteredPatientsList = this.patientsList.filter((patient: { name: string; }) =>
        patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPatientsList = this.patientsList;
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredPatientsList = this.patientsList;
  }
  
  medicalRecords(id: string) {
    this.router.navigate(['/lista-prontuarios', id]);
  }
  
}


