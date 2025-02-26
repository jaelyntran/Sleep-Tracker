import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, NavController} from "@ionic/angular"
import { RouterModule} from "@angular/router";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-daytime-sleepiness-log',
  templateUrl: './daytime-sleepiness-log.page.html',
  styleUrls: ['./daytime-sleepiness-log.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class DaytimeSleepinessLogPage implements OnInit {

  constructor(private storageService: StorageService,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateHome() {
    const activeElement = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
    this.navCtrl.navigateBack('/home');
  }
}
