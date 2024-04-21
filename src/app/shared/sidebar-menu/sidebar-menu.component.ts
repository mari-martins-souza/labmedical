import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { SidebarToogleService } from '../services/sidebar-toogle.service';


@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MatIconModule, MatSidenavModule, RouterLink],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})
export class SidebarMenuComponent {
  showSidebar: boolean | undefined;

  constructor(private router: Router, private sidebarToogleService: SidebarToogleService) { 
    this.sidebarToogleService.showSidebar.subscribe(show => this.showSidebar = show);
   }

  cleanLoggedUser() {
    localStorage.setItem('loggedUser', '');
    localStorage.setItem('isLogged', 'false');
    this.router.navigate(['/']);
  }

}
