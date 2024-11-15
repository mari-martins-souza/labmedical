import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import { StatisticsComponent } from "../statistics/statistics.component";
import { PatientsInfoComponent } from '../patients-info/patients-info.component';
import { AuthService } from '../../login/auth.service';
import { CommonModule } from '@angular/common';
import { RolePatientComponent } from '../role-patient/role-patient.component';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [SidebarMenuComponent, ToolbarComponent, StatisticsComponent, PatientsInfoComponent, CommonModule, RolePatientComponent]
})
export class HomePageComponent implements OnInit {
  userRole: string | null;

  constructor(private titleService: Title, private authService: AuthService) { 
    this.userRole = this.authService.getDecodedToken()?.scope || null;
  }

  ngOnInit() {
    this.titleService.setTitle('Estatísticas e Informações');
  }

}
