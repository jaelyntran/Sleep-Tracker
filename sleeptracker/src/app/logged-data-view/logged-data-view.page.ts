import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from "@ionic/angular"
import { RouterModule } from '@angular/router';
import { StorageService } from "../storage.service";
import { ViewWillEnter } from '@ionic/angular';


@Component({
  selector: 'app-logged-data-view',
  templateUrl: './logged-data-view.page.html',
  styleUrls: ['./logged-data-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LoggedDataViewPage implements OnInit, ViewWillEnter {
  bedtimeData: any [] = [];
  daytimeSleepinessData: any [] = [];
  bedtimeDataToShow: any[] = [];
  daytimeSleepinessDataToShow: any[] = [];
  bedtimePage: number = 0;
  sleepinessPage: number = 0;
  bedtimeItemsPerPage: number = 3;
  sleepItemsPerPage: number = 5;
  isBedtimeLogsExpanded: boolean = true;
  isSleepinessLogsExpanded: boolean = true;


  constructor(private storageService: StorageService,
              private navCtrl: NavController) { }

  async ionViewWillEnter(): Promise<void> {
    this.bedtimeData = await this.storageService.get("bedtimeLogs");
    this.daytimeSleepinessData = await this.storageService.get("sleepinessLogs");

    this.loadBedtimeData();
    this.loadDaytimeSleepinessData();
  }

  ngOnInit() { }

  loadBedtimeData() {
    const start = this.bedtimePage * this.bedtimeItemsPerPage;
    const end = start + this.bedtimeItemsPerPage;
    this.bedtimeDataToShow = this.bedtimeData.slice(start, end);
  }

  loadDaytimeSleepinessData() {
    const start = this.sleepinessPage * this.sleepItemsPerPage;
    const end = start + this.sleepItemsPerPage;
    this.daytimeSleepinessDataToShow = this.daytimeSleepinessData.slice(start, end);
  }

  loadMoreBedtime() {
    if (!this.isLastBedtimePage()) {
      this.bedtimePage++;
      this.loadBedtimeData();
    }
  }

  loadMoreSleepiness() {
    if (!this.isLastSleepinessPage()) {
      this.sleepinessPage++;
      this.loadDaytimeSleepinessData();
    }
  }

  goBackBedtime() {
    if (!this.isFirstBedtimePage()) {
      this.bedtimePage--;
      this.loadBedtimeData();
    }
  }

  goBackSleepiness() {
    if (!this.isFirstSleepinessPage()) {
      this.sleepinessPage--;
      this.loadDaytimeSleepinessData();
    }
  }

  isFirstBedtimePage(): boolean {
    return this.bedtimePage === 0;
  }

  isLastBedtimePage(): boolean {
    return this.bedtimePage >= Math.ceil(this.bedtimeData.length / this.bedtimeItemsPerPage) - 1;
  }

  isFirstSleepinessPage(): boolean {
    return this.sleepinessPage === 0;
  }

  isLastSleepinessPage(): boolean {
    return this.sleepinessPage >= Math.ceil(this.daytimeSleepinessData.length / this.sleepItemsPerPage) - 1;
  }

  toggleBedtimeLogs() {
    this.isBedtimeLogsExpanded = !this.isBedtimeLogsExpanded;
  }

  toggleSleepinessLogs() {
    this.isSleepinessLogsExpanded = !this.isSleepinessLogsExpanded;
  }

  navigateHome() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    this.navCtrl.navigateBack('/home');
  }
}
