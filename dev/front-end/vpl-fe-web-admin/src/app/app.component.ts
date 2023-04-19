import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';
import { DrawerService } from './shared/services/drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  themeMode!: 'light' | 'dark';

  isLoggedIn: boolean = false;

  constructor
    (private _loginService: LoginService, private _drawerService: DrawerService) {

  }

  ngOnInit(): void {
    this.isLoggedIn = this._loginService.isLoggedIn();

    let currentThemeMode = <any>localStorage.getItem('vpl_thememode');

    if (currentThemeMode) {
      if (currentThemeMode == 'light' || currentThemeMode == 'dark')
        this.themeMode = currentThemeMode;
      else
        this.themeMode = 'dark';
    }
    else
      this.themeMode = 'dark';
  }

  toggleThemeMode(): void {
    if (this.themeMode == 'light')
      this.themeMode = 'dark';
    else
      this.themeMode = 'light';

    localStorage.setItem('vpl_thememode', this.themeMode);
  }

  logout(): void {
    this._loginService.logout();
  }

  onDrawerToggle(): void {
    this._drawerService.toggleDrawer()
  }

}
