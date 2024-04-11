import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MatIconModule, MatSidenavModule, RouterLink],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.scss'
})
export class SidebarMenuComponent {
  showSidebar = true;

  constructor(private router: Router) { }


  cleanLoggedUser() {
    localStorage.setItem('loggedUser', '');
    localStorage.setItem('isLogged', 'false');
    this.router.navigate(['/']);
  }

  
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  

}
