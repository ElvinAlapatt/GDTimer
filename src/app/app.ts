import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { StopwatchCardComponent } from './components/stopwatch-card/stopwatch-card';
import { Header } from './components/header/header';
import { MainDial } from './components/main-dial/main-dial';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Header, MainDial, StopwatchCardComponent, Footer],
  styleUrls: ['./app.css'],
})
export class AppComponent implements AfterViewInit {
  cards: number[] = [];
  nextId: number = 0;
  exportText: string = "";

  @ViewChildren(StopwatchCardComponent) stopwatches!: QueryList<StopwatchCardComponent>;

  ngAfterViewInit(): void {
    // Restore from localStorage after view initializes
    setTimeout(() => {
      const saved = localStorage.getItem('stopwatchData');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.cards = parsed.map((_: any, i: number) => i);
        setTimeout(() => {
          parsed.forEach((item: any, i: number) => {
            const card = this.stopwatches.get(i);
            if (card) {
              card.name = item.name;
              card.minutes = item.minutes;
              card.seconds = item.seconds;
            }
          });
        }, 0);
        this.nextId = parsed.length;
      }
    });
  }
  ngOnInit(): void {
    setInterval(() => this.saveToLocalStorage(), 1000); // Save every 2s
  }

  createCard() {
    this.cards.push(this.nextId++);
    setTimeout(() => this.saveToLocalStorage(), 0); // Save after view updates
  }

  deleteCard(id: number) {
    this.cards = this.cards.filter(card => card !== id);
    setTimeout(() => this.saveToLocalStorage(), 0); // Save after delete
  }

  onStartActive(activeCard: StopwatchCardComponent) {
    this.stopwatches.forEach(card => {
      if (card !== activeCard) {
        card.pause();
      }
    });
  }

  generateExportText() {
    const result = this.stopwatches.map(card => {
      const name = card.name.trim() || 'Unnamed';
      const time = card.getFormattedTime();
      return `${name} - ${time}`;
    }).join('\n');

    this.exportText = result;
  }

  saveToLocalStorage() {
    const data = this.stopwatches.map(card => ({
      name: card.name,
      minutes: card.minutes,
      seconds: card.seconds
    }));
    localStorage.setItem('stopwatchData', JSON.stringify(data));
  }
}
