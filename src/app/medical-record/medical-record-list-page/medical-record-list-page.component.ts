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
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(private titleService: Title, private dataService: DataService, private router: Router) { }

  ngOnInit() {

    this.titleService.setTitle('Lista de prontuários');

    // this.dataService.getData('patients').subscribe((data: any) => {
    //   this.patientsList = data;
    //   this.filteredPatientsList = data;
    // });

    this.getPatients(0, 10);
  }

  getPatients(page: number, size: number): void {
    this.dataService.listPatients(page, size).subscribe({
      next: (response: Page<ListPatients>) => {
        this.medicalRecordPatientsList = response.content;
        console.log('Patients loaded successfully:', this.medicalRecordPatientsList);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading patients:', error);
      }
    });
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


