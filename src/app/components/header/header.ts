import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  public currentTheme: 'light' | 'dark' = 'light';

  ngOnInit(): void {
    const saved = localStorage.getItem('gd-timer-theme') as 'light' | 'dark' | null;
    if (saved) {
      this.currentTheme = saved;
      document.documentElement.setAttribute('data-theme', saved);
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('gd-timer-theme', this.currentTheme);
  }

  starGithub() {
    window.open('https://github.com/ElvinAlapatt/GDTimer', '_blank');
  }
}
