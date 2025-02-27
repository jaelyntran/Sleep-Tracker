import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from "@ionic/angular"
import { RouterModule} from "@angular/router";
import { StorageService } from "../storage.service";
import { StanfordSleepinessData } from "../data/stanford-sleepiness-data";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-daytime-sleepiness-log',
  templateUrl: './daytime-sleepiness-log.page.html',
  styleUrls: ['./daytime-sleepiness-log.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class DaytimeSleepinessLogPage implements OnInit {
  sleepinessLevel: number | null = null;
  stanfordSleepiness: StanfordSleepinessData = new StanfordSleepinessData(-1, new Date());
  constructor(private storageService: StorageService,
              private navCtrl: NavController,
              private alertController: AlertController,) { }

  ngOnInit() {
  }

  async logSleepiness() {
    try {
      if (this.sleepinessLevel !== null) {
        const currentLogs = await this.storageService.get("sleepinessLogs") || [];
        this.stanfordSleepiness = new StanfordSleepinessData(this.sleepinessLevel, new Date());
        currentLogs.push({
          sleepinessLevel: this.stanfordSleepiness.summaryString(),
          logTime: this.formatDate(this.stanfordSleepiness.loggedAt),
          logId: this.stanfordSleepiness.id,
        });
        await this.storageService.set("sleepinessLogs", currentLogs);
        console.log("Sleep log saved successfully.");
        this.sleepinessLevel = null;

        await this.showSuccessWindow();
      } else {
        const alert = await this.alertController.create({
          header: 'Invalid Action',
          message: 'Please select a sleepiness level before logging.',
          buttons: ['OK']
        });

        await alert.present();
        return;
      }
    } catch (err) {
      console.log("Error saving sleepiness level:", err);
    }
  }

  formatDate(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const thisDayOfWeek = daysOfWeek[date.getDay()];

    return `${thisDayOfWeek}, ${month}/${day}/${year} ${hours}:${minutes}${period}`;
  }

  async showSuccessWindow() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: "Logged daytime sleepiness successfully!",
      buttons: ['OK']
    });
    await alert.present();
  }

  navigateHome() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    this.navCtrl.navigateBack('/home');
  }
}
