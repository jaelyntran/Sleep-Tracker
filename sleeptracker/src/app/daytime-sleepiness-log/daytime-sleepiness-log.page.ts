import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from "@ionic/angular"
import { RouterModule} from "@angular/router";
import { StorageService } from "../storage.service";
import { StanfordSleepinessData } from "../data/stanford-sleepiness-data";

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
              private navCtrl: NavController) { }

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
