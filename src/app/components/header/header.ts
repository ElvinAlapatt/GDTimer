import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  starGithub(){
    window.open('https://github.com/ElvinAlapatt/GDTimer','_blank')
  }
}