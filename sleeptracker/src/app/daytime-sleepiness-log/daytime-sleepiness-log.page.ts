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
              private alertCtrl: AlertController,) { }

  ngOnInit() {
  }

  async logSleepiness() {
    try {
      if (this.sleepinessLevel !== null) {
        const currentLogs = await this.storageService.get("sleepinessLogs") || [];
        this.stanfordSleepiness = new StanfordSleepinessData(this.sleepinessLevel, new Date());
        currentLogs.push({
          sleepinessLevel: this.stanfordSleepiness.summaryString(),
          logTime: this.stanfordSleepiness.loggedAt,
          logId: this.stanfordSleepiness.id,
        });
        await this.storageService.set("sleepinessLogs", currentLogs);
        console.log("Sleep log saved successfully.");
        console.log("Length of logs: ", currentLogs.length);
        for ( let i = 0; i < currentLogs.length; i++ ) {
          console.log(currentLogs[i]);
        }
        this.sleepinessLevel = null;
      } else {
        const alert = await this.alertCtrl.create({
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

  navigateHome() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    this.navCtrl.navigateBack('/home');
  }
}
