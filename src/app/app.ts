import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { MainDial } from './components/main-dial/main-dial';

@Component({
  selector: 'app-root',
  imports: [Header, MainDial, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'GDTimer';
}
