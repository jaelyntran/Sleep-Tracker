import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { OvernightSleepData } from "../data/overnight-sleep-data";
import { RouterModule } from '@angular/router';
import { SleepDetailsComponent } from "../sleep-details/sleep-details.component";

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

  constructor(private modalController: ModalController) { }

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

  resetBedtimeLog() {
    this.endedBedtime = false;
    this.startedBedtime = false;
  }
}
