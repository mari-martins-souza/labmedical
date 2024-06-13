import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarToogleService } from '../services/sidebar-toogle.service';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  pageTitle: string | undefined;

  constructor(private sidebarToogleService: SidebarToogleService, private titleService: Title, private router: Router) { }

  toggleSidebar() {
    this.sidebarToogleService.toggleSidebar();
  }

  userName = localStorage.getItem('loggedUser');

  ngOnInit() {
    this.pageTitle = this.titleService.getTitle();
  }

  cleanLoggedUser() {
    localStorage.setItem('loggedUser', '');
    localStorage.setItem('isLogged', 'false');
    this.router.navigate(['/']);
  }

}
