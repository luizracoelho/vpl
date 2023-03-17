import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  themeMode!: 'light' | 'dark';

  ngOnInit(): void {
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

}
