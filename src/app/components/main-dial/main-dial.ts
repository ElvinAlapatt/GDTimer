import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-dial',
  imports: [FormsModule],
  templateUrl: './main-dial.html',
  styleUrl: './main-dial.css',
})
export class MainDial {
  minutes: number = 0;
  seconds: number = 0;
  private interval: any = 0;
  private totalSeconds: number = 0;
  isRunning: boolean = false;

  alarmAudio = new Audio('alarm.mp3');

  showAlarm: boolean = false;

  get formattedTime(): string {
    const mm = this.minutes.toString().padStart(2, '0');
    const ss = this.seconds.toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }

  validateTime() {
    this.minutes = Math.min(59, Math.max(0, this.minutes));
    this.seconds = Math.min(59, Math.max(0, this.seconds));
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.isRunning = false;
  }

  playAlarm() {
  this.alarmAudio.loop = true;

  this.alarmAudio.play().then(() => {
    this.showAlarm = true; // show the modal after sound starts
  }).catch((err) => {
    console.error('Audio failed to play:', err);
  });
}

dismissAlarm() {
  this.alarmAudio.pause();
  this.alarmAudio.currentTime = 0;
  this.showAlarm = false;
}

  startTimer() {
    if (this.isRunning) return;

    this.totalSeconds = this.minutes * 60 + this.seconds;
    if (this.totalSeconds <= 0) return;

    // FIX: Preload the audio during user interaction
    this.alarmAudio.load();

    this.isRunning = true;

    this.interval = setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;

        this.minutes = Math.floor(this.totalSeconds / 60);
        this.seconds = this.totalSeconds % 60;

        this.updateDocumentTitle();

        if (this.totalSeconds === 0) {
          this.playAlarm(); // Trigger alarm
        }
      } else {
        this.pauseTimer();
      }
    }, 1000);
  }

  resetTimer() {
    this.pauseTimer();
    this.minutes = 0;
    this.seconds = 0;
    this.totalSeconds = 0;
    this.updateDocumentTitle();
  }

  updateDocumentTitle() {
    const min = this.minutes.toString().padStart(2, '0');
    const sec = this.seconds.toString().padStart(2, '0');
    document.title = `${min}:${sec} - GD Timer`;
  }
}
