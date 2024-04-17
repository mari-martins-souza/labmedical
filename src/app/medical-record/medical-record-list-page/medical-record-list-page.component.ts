import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../shared/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-medical-record-list-page',
  standalone: true,
  imports: [SidebarMenuComponent, ToolbarComponent, MatCardModule, HttpClientModule, CommonModule, FormsModule, MatInputModule, MatButtonModule,MatButton, RouterModule],
  providers: [DataService],
  templateUrl: './medical-record-list-page.component.html',
  styleUrl: './medical-record-list-page.component.scss'
})
export class MedicalRecordListPageComponent implements OnInit {
  patientsList: any = [];
  filteredPatientsList: any = [];
  searchTerm: string = '';

  constructor(private titleService: Title, private dataService: DataService, private router: Router) { }

  ngOnInit() {

    this.titleService.setTitle('Lista de prontuários');

    this.dataService.getData('patients').subscribe((data: any) => {
      this.patientsList = data;
      this.filteredPatientsList = data;

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

  medicalRecords(id: string) {
    this.router.navigate(['/lista-prontuarios', id]);
  }
  
}


