import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DataService } from '../../shared/services/data.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AgePipe } from "../../shared/pipes/age.pipe";
import { Router } from '@angular/router';

@Component({
    selector: 'app-patients-info',
    standalone: true,
    providers: [DataService],
    templateUrl: './patients-info.component.html',
    styleUrl: './patients-info.component.scss',
    imports: [MatCardModule, FormsModule, HttpClientModule, MatInputModule, MatButtonModule, MatButton, CommonModule, AgePipe]
})
export class PatientsInfoComponent implements OnInit {
  patientID: any = '';
  patientsList: any = [];
  filteredPatientsList: any = [];
  searchTerm: string = '';

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {

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

  clearSearch() {
    this.searchTerm = '';
    this.filteredPatientsList = this.patientsList;
  }
  

  editPatient(id: string) {
    this.router.navigate(['/registro-paciente', id]);
  }

}
