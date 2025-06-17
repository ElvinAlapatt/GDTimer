import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-dial',
  imports: [FormsModule],
  templateUrl: './main-dial.html',
  styleUrl: './main-dial.css'
})
export class MainDial {
  minutes: number = 0 ;
  seconds: number = 0;

  private interval : any = 0 ;
  private totalSeconds : number = 0 ;
  isRunning : boolean = false ;

  get formattedTime(): string {
    const mm = this.minutes.toString().padStart(2, '0');
    const ss = this.seconds.toString().padStart(2, '0');
    return `${mm}:${ss}`;
  }

  validateTime(){
    if (this.minutes > 59){this.minutes = 59}
    if (this.minutes < 0){this.minutes = 0}

    if (this.seconds > 59){this.seconds = 59}
    if (this.seconds < 0){this.seconds = 0}
  }


  pauseTimer(){
    clearInterval(this.interval);
    this.isRunning = false ;
  }

  playAlarm() {
  const audio = new Audio('alarm.mp3');
  audio.loop = true; 

  audio.play().then(() => {
    alert('Time is Up!');
    audio.pause();
    audio.currentTime = 0;
  }).catch((err) => {
    console.error('Audio failed to play:', err);
  });
  }

  startTimer(){
    if(this.isRunning){return;} //this knows if the timer is already running

    this.totalSeconds = (this.minutes * 60) + this.seconds ; //conversion

    if(this.totalSeconds <= 0){return;} //if the timer is 0 at the time of the start function call

    this.interval = setInterval(()=>{
      if(this.totalSeconds > 0){
        this.totalSeconds-- ;

        this.minutes = Math.floor(this.totalSeconds / 60);
        this.seconds = this.totalSeconds % 60 ;

        if (this.totalSeconds === 0) {
          this.playAlarm();  // 🧠 play sound only when it hits 0
        }
      }else{
        this.pauseTimer();
      }
    },1000);
  }

  resetTimer(){
    this.pauseTimer();
    this.minutes = 0 ;
    this.seconds = 0 ;
  }
}
