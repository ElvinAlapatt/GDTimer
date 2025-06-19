import { Component, EventEmitter, Output, OnInit , Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stopwatch-card',
  templateUrl: './stopwatch-card.html',
  imports: [FormsModule],
  styleUrls: ['./stopwatch-card.css'],
})
export class StopwatchCardComponent implements OnInit {

  @Input() id!: number;
  public name: string = '';
  public isInvalid: boolean = false;
  minutes: number = 0;
  seconds: number = 0;
  interval: any = null;
  startTimestamp: number | null = null;
  isRunning: boolean = false;

  @Output() started = new EventEmitter<StopwatchCardComponent>();
  @Output() delete = new EventEmitter<void>();

  ngOnInit(): void {
    const data = localStorage.getItem(this.getStorageKey());
    if (data) {
      const saved = JSON.parse(data);
      this.name = saved.name || '';
      this.minutes = saved.minutes || 0;
      this.seconds = saved.seconds || 0;
      this.isRunning = saved.isRunning || false;
      this.startTimestamp = saved.startTimestamp || null;

      if (this.isRunning && this.startTimestamp) {
        const elapsedSeconds = Math.floor(
          (Date.now() - this.startTimestamp) / 1000
        );
        const totalSeconds = this.minutes * 60 + this.seconds + elapsedSeconds;
        this.minutes = Math.floor(totalSeconds / 60);
        this.seconds = totalSeconds % 60;

        // restart the interval countdown
        this.interval = setInterval(() => {
          this.seconds++;
          if (this.seconds >= 60) {
            this.seconds = 0;
            this.minutes++;
          }
          this.save();
        }, 1000);
      }
    }
  }

  start(updateTimestamp: boolean = true) {
    if (!this.interval) {
      if (updateTimestamp) {
        this.startTimestamp = Date.now();
      }

      this.isRunning = true;
      this.save();

      this.started.emit(this);
      this.interval = setInterval(() => {
        this.seconds++;
        if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes++;
        }
        this.save(); // keep saving updated time
      }, 1000);
    }
  }

  pause() {
    clearInterval(this.interval);
    this.interval = null;
    this.isRunning = false;
    this.startTimestamp = null;
    this.save();
  }

  reset() {
    this.pause();
    this.minutes = 0;
    this.seconds = 0;
    this.save();
  }

  onDelete() {
    this.pause();
    localStorage.removeItem(this.getStorageKey());
    this.delete.emit();
  }

  getFormattedTime(): string {
    const m = this.minutes.toString().padStart(2, '0');
    const s = this.seconds.toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  blinkInvalid() {
    this.isInvalid = true;
    setTimeout(() => (this.isInvalid = false), 1500);
  }

  save() {
    localStorage.setItem(
      this.getStorageKey(),
      JSON.stringify({
        name: this.name,
        minutes: this.minutes,
        seconds: this.seconds,
        isRunning: this.isRunning,
        startTimestamp: this.isRunning ? this.startTimestamp : null,
      })
    );
  }

  private getStorageKey(): string {
  return `stopwatch-${this.id}`;
}

}
