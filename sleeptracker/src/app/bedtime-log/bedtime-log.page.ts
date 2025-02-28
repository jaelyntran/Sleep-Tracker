import { Component, OnInit } from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController} from '@ionic/angular';
import { OvernightSleepData } from "../data/overnight-sleep-data";
import { RouterModule } from '@angular/router';
import { SleepDetailsComponent } from "../sleep-details/sleep-details.component";
import { StorageService } from "../storage.service";
import { AlertController } from '@ionic/angular';

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
  errorMessage: string = "";

  constructor(private modalController: ModalController,
              private storageService: StorageService,
              private navCtrl: NavController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.sleepStart = new Date().toISOString();
    this.sleepEnd = new Date().toISOString();
  }

  async logSleepStart() {
    if (this.sleepStart) {
      console.log("Sleep start: " + this.sleepStart);
      await this.showSuccessWindow();
      this.startedBedtime = true;
    } else {
      console.log('Please enter a valid start time.');
    }
  }

  async logSleepEnd() {
    if (this.sleepEnd) {
      if (new Date(this.sleepEnd) <= new Date(this.sleepStart)) {
        this.errorMessage = "Sleep must span overnight. " +
          "Please select a valid end time.";
        await this.showErrorWindow(this.errorMessage);
        this.errorMessage = "";
        return;
      } else {
        this.endedBedtime = true;
        this.sleepData = new OvernightSleepData(new Date(this.sleepStart), new Date(this.sleepEnd));

        this.sleepStart = this.formatDate(new Date(this.sleepStart));
        this.sleepEnd = this.formatDate(new Date(this.sleepEnd));

        if(await this.saveSleepLog()) {
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
          this.resetBedtimeLog();
        }
      }
    } else {
        console.log('Please select a valid end time.');
    }
  }

  async saveSleepLog(): Promise<boolean> {
    try {
      const currentLogs = await this.storageService.get("bedtimeLogs") || [];
      const todayLogs = currentLogs.filter ((log: any) => log.sleepDate === this.sleepData.dateString());
      if (todayLogs.length > 0) {
        this.errorMessage = "You have already logged sleep for today. " +
          "Please try again tomorrow.";
        await this.showErrorWindow(this.errorMessage);
        this.errorMessage = "";
        return false;
      } else {
        currentLogs.push({
          sleepStart: this.sleepStart,
          sleepEnd: this.sleepEnd,
          sleepDuration: this.sleepData.summaryString(),
          sleepDate: this.sleepData.dateString(),
          logId: this.sleepData.id,
        });

        await this.storageService.set("bedtimeLogs", currentLogs);
        console.log("Sleep log saved successfully.");
        return true;
      }
    } catch (err) {
      console.log("Error saving sleep log:", err);
      this.errorMessage = "";
      return false;
    }
  }

  resetBedtimeLog() {
    this.endedBedtime = false;
    this.startedBedtime = false;
    this.sleepStart = new Date().toISOString();
    this.sleepEnd = new Date().toISOString();
  }

  async showErrorWindow(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showSuccessWindow() {
    const alert = await this.alertController.create({
      header: 'Success',
      message: "Logged bedtime successfully!",
      buttons: ['OK']
    });
    await alert.present();
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

  navigateHome() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    this.navCtrl.navigateBack('/home');
  }
}
