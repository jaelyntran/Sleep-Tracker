import {Component, OnInit} from '@angular/core';
import {AlertController, IonicModule} from "@ionic/angular"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common";
import { bedOutline } from 'ionicons/icons';
import { happyOutline } from "ionicons/icons";
import { calendarOutline } from "ionicons/icons";
import { settingsOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import { StorageService } from "../storage.service";
import { ViewWillEnter } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class HomePage implements OnInit, ViewWillEnter{
  bedtimeData: any[] = [];
  daytimeSleepinessData: any[] = [];
  longestSleep: string = '';
  longestSleepNight: string = '';
  shortestSleep: string = '';
  shortestSleepNight: string = '';
  averageSleepiness: number = 0;
  currentTime: string = "";
  greeting: string = '';
  gif: string = '';
  greetingColor: string = "";

  constructor(private storageService: StorageService,
              private alertController : AlertController,
              private changeDetectorRef: ChangeDetectorRef,) {
    addIcons({ bedOutline, happyOutline, calendarOutline, settingsOutline });
	}

  ngOnInit() { }

	async ionViewWillEnter(): Promise<void> {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);

    this.bedtimeData = await this.storageService.get("bedtimeLogs") || [];
    this.daytimeSleepinessData = await this.storageService.get("sleepinessLogs") || [];

    console.log(this.daytimeSleepinessData.length);
    console.log(this.bedtimeData.length);

    this.longestNight();
    this.shortestNight();
    this.findAverageSleepiness();

    this.changeDetectorRef.detectChanges();
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.setGreeting(now.getHours());
  }

  setGreeting(hours: number) {
    if (hours >= 5 && hours < 12) {
      this.greeting = 'Good Morning ☀️';
      this.gif = "assets/pompompurin-morning.gif";
      this.greetingColor = "#de9bae";
    } else if (hours >= 12 && hours < 17) {
      this.greeting = 'Good Afternoon 🌤️';
      this.gif = "assets/pompompurin-afternoon.gif";
      this.greetingColor = "#ff8052";
    } else if (hours >= 17 && hours < 21) {
      this.greeting = 'Good Evening 🌙';
      this.gif = "assets/pompompurin-evening.gif";
      this.greetingColor = "#ba91ff";
    } else {
      this.greeting = 'Good Night 🌌';
      this.gif = "assets/pompompurin-night.gif";
      this.greetingColor = "#85d2ff";
    }
  }

  findAverageSleepiness() {
    if (this.daytimeSleepinessData.length > 0) {
      const totalSleepiness = this.daytimeSleepinessData.reduce((sum, log) => {
        const sleepinessLevel = parseInt(log.sleepinessLevel.split(":")[0], 10);

        if (!isNaN(sleepinessLevel)) {
          return sum + sleepinessLevel;
        }
        return sum;
      }, 0);

      this.averageSleepiness = Math.round(totalSleepiness / this.daytimeSleepinessData.length);
    } else {
      this.averageSleepiness = 0;
    }
  }

  private parseSleepDuration(duration: string): number {
    const durationParts = duration.match(/(\d+)\s*(?:hours?|h)[\s,]*(\d+)\s*(?:minutes?|min)/i);
    if (durationParts) {
      const hours = parseInt(durationParts[1], 10);
      const minutes = parseInt(durationParts[2], 10);
      return (hours * 60) + minutes;
    }
    return 0;
  }

  longestNight() {
    if (this.bedtimeData.length === 0) {
      this.longestSleep = '0 h 0 min';
      this.longestSleepNight = 'No data available';
      return;
    }

    const longestLog = this.bedtimeData.reduce((maxLog, currentLog) => {
      const maxDuration = this.parseSleepDuration(maxLog.sleepDuration);
      const currentDuration = this.parseSleepDuration(currentLog.sleepDuration);

      console.log("Current log:", currentLog);
      console.log("Max duration:", maxDuration, currentDuration);

      return currentDuration > maxDuration ? currentLog : maxLog;
    });

    this.longestSleep = longestLog ? `${longestLog.sleepDuration}` : '0 h 0 min';
    this.longestSleepNight = longestLog ? this.formatDate(longestLog.sleepDate) : 'No data available';
  }

  shortestNight() {
    if (this.bedtimeData.length === 0) {
      this.shortestSleep = '0 h 0 min';
      this.shortestSleepNight = 'No data available';
      return
    }

    const shortestLog = this.bedtimeData.reduce((minLog, currentLog) => {
      const minDuration = this.parseSleepDuration(minLog.sleepDuration);
      const currentDuration = this.parseSleepDuration(currentLog.sleepDuration);

      console.log("Current log:", currentLog);
      console.log("Min duration:", minDuration, currentDuration);
      return currentDuration < minDuration ? currentLog : minLog;
    });

    this.shortestSleep = shortestLog ? `${shortestLog.sleepDuration}` : '0 h 0 min';
    this.shortestSleepNight = shortestLog ? this.formatDate(shortestLog.sleepDate) : 'No data available';
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  averageSleepDuration(): number {
    const totalDurationInMinutes = this.bedtimeData.reduce((sum, log) => {
      return sum + this.parseSleepDuration(log.sleepDuration);
    }, 0);
    return this.bedtimeData.length > 0 ? totalDurationInMinutes / this.bedtimeData.length : 0;
  }

  averageSleepDurationInHoursAndMinutes(): string {
    const avgMinutes = this.averageSleepDuration();
    const hours = Math.floor(avgMinutes / 60);
    const minutes = Math.floor(avgMinutes % 60);

    return `${hours} h ${minutes} min`;
  }

  async clearAppData() {
    if (this.bedtimeData.length === 0 && this.daytimeSleepinessData.length === 0) {
      const alert = await this.alertController.create({
        header: 'No Data to Clear',
        message: 'There is no data available to clear.',
        buttons: ['OK'],
      });

      await alert.present();
      return;
    } else {
      const alert = await this.alertController.create({
        header: 'Clear All Data',
        message: 'Are you sure you want to clear all app data? This action cannot be undone.',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Clear Data',
            handler: async () => {
              await this.storageService.clearAll();
              this.bedtimeData = [];
              this.daytimeSleepinessData = [];
              this.longestSleep = '0 h 0 min';
              this.longestSleepNight = 'No data available';
              this.shortestSleep= '0 h 0 min';
              this.shortestSleepNight = 'No data available';
              this.averageSleepiness = 0;

              console.log('All data has been cleared');

              const successAlert = await this.alertController.create({
                header: 'Success',
                message: 'All data is successfully cleared.',
                buttons: ['OK']
              });
              await successAlert.present();
            },
          }
        ]
      });
      await alert.present();
    }
  }
}
