import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController} from '@ionic/angular';
import { OvernightSleepData } from "../data/overnight-sleep-data";
import { RouterModule } from '@angular/router';
import { SleepDetailsComponent } from "../sleep-details/sleep-details.component";
import { StorageService } from "../storage.service";

@Component({
  selector: 'app-bedtime-log',
  templateUrl: './bedtime-log.page.html',
  styleUrls: ['./bedtime-log.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class BedtimeLogPage implements OnInit {
  sleepStart: string = new Date().toISOString();
  sleepEnd: string = new Date().toISOString();
  sleepData: OvernightSleepData = new OvernightSleepData(new Date(), new Date());
  startedBedtime: boolean = false;
  endedBedtime: boolean = false;

  constructor(private modalController: ModalController,
              private storageService: StorageService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.sleepStart = new Date().toISOString();
    this.sleepEnd = new Date().toISOString();
  }

  logSleepStart() {
    if (this.sleepStart) {
      console.log("Sleep start: " + this.sleepStart);
      this.startedBedtime = true;
    } else {
      console.log('Please enter a valid start time.');
    }
  }

  async logSleepEnd() {
    if (this.sleepEnd) {
      this.endedBedtime = true;
      this.sleepData = new OvernightSleepData(new Date(this.sleepStart), new Date(this.sleepEnd));
      console.log('Sleep End:', this.sleepEnd);
      console.log('Sleep Duration:', this.sleepData.summaryString());
      console.log('Sleep Date:', this.sleepData.dateString());

      await this.saveSleepLog();

      const modal = await this.modalController.create({
        component: SleepDetailsComponent,
        componentProps: {
          sleepStart: this.sleepStart,
          sleepEnd: this.sleepEnd,
          sleepDuration: this.sleepData.summaryString(),
          sleepDate: this.sleepData.dateString(),
        }
      });

      modal.onDidDismiss().then(() => {
        this.resetBedtimeLog();
      });

      return await modal.present();
    } else {
      console.log('Please select a valid end time.');
    }
  }

  async saveSleepLog() {
    try {
      const currentLogs = await this.storageService.get("sleepLogs") || [];
      currentLogs.push({
        sleepStart: this.sleepStart,
        sleepEnd: this.sleepEnd,
        sleepDuration: this.sleepData.summaryString(),
        sleepDate: this.sleepData.dateString(),
      });

      await this.storageService.set("sleepLogs", currentLogs);
      console.log("Sleep log saved successfully.");
    } catch (err) {
      console.log("Error saving sleep log:", err);
    }
  }

  resetBedtimeLog() {
    this.endedBedtime = false;
    this.startedBedtime = false;
  }

  navigateHome() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    this.navCtrl.navigateBack('/home');
  }
}
