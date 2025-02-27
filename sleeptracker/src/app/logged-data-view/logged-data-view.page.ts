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
  constructor(private storageService: StorageService,
              private navCtrl: NavController) { }

  async ionViewWillEnter(): Promise<void> {
    this.bedtimeData = await this.storageService.get("bedtimeLogs");
    this.daytimeSleepinessData = await this.storageService.get("sleepinessLogs");
  }

  ngOnInit() { }

  navigateHome() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    this.navCtrl.navigateBack('/home');
  }

}
