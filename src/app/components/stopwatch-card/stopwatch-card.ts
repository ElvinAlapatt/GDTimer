import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stopwatch-card',
  templateUrl: './stopwatch-card.html',
  imports: [FormsModule],
  styleUrls: ['./stopwatch-card.css']
})
export class StopwatchCardComponent {
  public name: string = "";
  public isInvalid: boolean = false;
  minutes: number = 0;
  seconds: number = 0;
  interval: any;

  @Output() started = new EventEmitter<StopwatchCardComponent>();
  @Output() delete = new EventEmitter<void>();

  start() {
    if (!this.interval) {
      this.started.emit(this);
      this.interval = setInterval(() => {
        this.seconds++;
        if (this.seconds === 60) {
          this.seconds = 0;
          this.minutes++;
        }
      }, 1000);
    }
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
  }

  reset() {
    this.pause();
    this.minutes = 0;
    this.seconds = 0;
  }

  onDelete() {
    this.pause();
    this.delete.emit();
  }

  getFormattedTime(): string {
    const m = this.minutes.toString().padStart(2, '0');
    const s = this.seconds.toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  blinkInvalid() {
    this.isInvalid = true;
    setTimeout(() => {
      this.isInvalid = false;
    }, 1500);
  }
}