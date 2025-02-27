import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
      if (new Date(this.sleepEnd) <= new Date(this.sleepStart)) {
        this.errorMessage = "Sleep must span overnight. " +
          "Please select a valid end time.";
        await this.showErrorWindow(this.errorMessage);
        this.errorMessage = "";
        return;
      } else {
        this.endedBedtime = true;
        this.sleepData = new OvernightSleepData(new Date(this.sleepStart), new Date(this.sleepEnd));
        console.log('Sleep End:', this.sleepEnd);
        console.log('Sleep Duration:', this.sleepData.summaryString());
        console.log('Sleep Date:', this.sleepData.dateString());

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
        console.log("Length of logs: ", currentLogs.length);
        for ( let i = 0; i < currentLogs.length; i++ ) {
          console.log(currentLogs[i]);
        }
        return true;
      }
    } catch (err) {
      console.log("Error saving sleep log:", err);
      await this.showErrorWindow(this.errorMessage);
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

  navigateHome() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    this.navCtrl.navigateBack('/home');
  }
}
