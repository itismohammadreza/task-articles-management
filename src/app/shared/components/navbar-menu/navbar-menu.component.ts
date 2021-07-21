import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/http';
import { User } from '@shared/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {
  }

  showSidebar: boolean = false;
  currentUser$: Observable<User>;

  ngOnInit() {
    this.currentUser$ = this.authService.getCurrentUser()
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
