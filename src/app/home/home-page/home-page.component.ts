import { Component, OnInit } from '@angular/core';
import { SidebarMenuComponent } from '../../shared/sidebar-menu/sidebar-menu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { Title } from '@angular/platform-browser';
import { StatisticsComponent } from "../statistics/statistics.component";
import { PatientsInfoComponent } from '../patients-info/patients-info.component';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
    imports: [SidebarMenuComponent, ToolbarComponent, StatisticsComponent, PatientsInfoComponent]
})
export class HomePageComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Estatísticas e Informações');
  }

}
