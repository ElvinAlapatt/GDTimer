import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-dial',
  imports: [FormsModule],
  templateUrl: './main-dial.html',
  styleUrl: './main-dial.css',
})
export class MainDial implements OnInit {
  minutes: number = 0;
  seconds: number = 0;
  private interval: any = null;
  private endTimestamp: number = 0;
  isRunning: boolean = false;

  alarmAudio = new Audio('alarm.mp3');
  showAlarm: boolean = false;

  ngOnInit(): void {
    const saved = localStorage.getItem('mainTimer');
    if (saved) {
      const parsed = JSON.parse(saved);
      const now = Date.now();

      if (parsed.endTimestamp && now < parsed.endTimestamp) {
        const remainingSeconds = Math.floor((parsed.endTimestamp - now) / 1000);
        this.minutes = Math.floor(remainingSeconds / 60);
        this.seconds = remainingSeconds % 60;
        this.endTimestamp = parsed.endTimestamp;
        this.startTimer(true); // resume without resetting timestamp
      } else {
        this.minutes = 0;
        this.seconds = 0;
        this.endTimestamp = 0;
        this.updateDocumentTitle();
      }
    }
  }

  get formattedTime(): string {
    const mm = this.minutes.toString().padStart(2, '0');
    const ss = this.seconds.toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }

  validateTime() {
    this.minutes = Math.min(59, Math.max(0, this.minutes));
    this.seconds = Math.min(59, Math.max(0, this.seconds));
  }

  startTimer(resume: boolean = false) {
    if (this.isRunning) return;

    let totalSeconds = this.minutes * 60 + this.seconds;
    if (totalSeconds <= 0) return;

    if (!resume) {
      this.endTimestamp = Date.now() + totalSeconds * 1000;
    }

    localStorage.setItem('mainTimer', JSON.stringify({ endTimestamp: this.endTimestamp }));
    this.isRunning = true;

    this.interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((this.endTimestamp - now) / 1000));
      this.minutes = Math.floor(remaining / 60);
      this.seconds = remaining % 60;

      this.updateDocumentTitle();

      if (remaining <= 0) {
        this.pauseTimer();
        this.playAlarm();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.interval = null;
    this.isRunning = false;
    localStorage.removeItem('mainTimer');
  }

  resetTimer() {
    this.pauseTimer();
    this.minutes = 0;
    this.seconds = 0;
    this.endTimestamp = 0;
    this.updateDocumentTitle();
  }

  playAlarm() {
    this.alarmAudio.loop = true;
    this.alarmAudio.play().then(() => {
      this.showAlarm = true;
    }).catch((err) => {
      console.error('Audio playback failed:', err);
    });
  }

  dismissAlarm() {
    this.alarmAudio.pause();
    this.alarmAudio.currentTime = 0;
    this.showAlarm = false;
  }

  updateDocumentTitle() {
    const mm = this.minutes.toString().padStart(2, '0');
    const ss = this.seconds.toString().padStart(2, '0');
    document.title = `${mm}:${ss} - GD Timer`;
  }
}
