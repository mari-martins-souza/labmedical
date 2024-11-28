import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidebarToogleService } from '../services/sidebar-toogle.service';
import { Title } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../login/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterLink],
  providers: [AuthService],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  pageTitle: string | undefined;

  constructor(@Inject(AuthService) private authService: AuthService, private sidebarToogleService: SidebarToogleService, private titleService: Title, private router: Router) { }

  toggleSidebar() {
    this.sidebarToogleService.toggleSidebar();
  }

  // userName = localStorage.getItem('loggedUser');

  userName: String | null = '';

  ngOnInit() {
    this.pageTitle = this.titleService.getTitle();

    const token = sessionStorage.getItem('jwtToken');
    this.userName = this.authService.getUserNameFromToken();
  }

  cleanLoggedUser() {
    sessionStorage.setItem('jwtToken', '');
    this.router.navigate(['/']);
  }

}
