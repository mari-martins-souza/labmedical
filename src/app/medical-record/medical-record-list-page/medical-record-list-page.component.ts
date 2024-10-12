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
  searchTerm: string = '';
  patientsList: any = [];
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 10;
  hasMorePages: boolean = false;
  noResults: boolean = false;

  constructor(private titleService: Title, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Lista de prontuários');
    this.getPatients(this.currentPage);
  }

  getPatients(page: number, name?: string): void {
    this.dataService.listPatients(page, this.pageSize, name).subscribe({
        next: (response: Page<ListPatients>) => {
            this.patientsList = response.content;
            this.medicalRecordPatientsList = this.patientsList;
            
            if (this.patientsList.length === 0) {
              this.noResults = true;
              this.medicalRecordPatientsList = [];
            } else {
                this.noResults = false;
            }

            this.totalPages = response.totalPages;
            this.hasMorePages = this.currentPage < this.totalPages - 1;
            console.log('Patients loaded successfully:', this.medicalRecordPatientsList);
        },
        error: (error: HttpErrorResponse) => {
            console.error('Error loading patients:', error);
            this.noResults = true;
            this.medicalRecordPatientsList = [];
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
  
  medicalRecords(id: string) {
    this.router.navigate(['/lista-prontuarios', id]);
  }
  
}


