import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { IonicModule } from "@ionic/angular"
import { RouterModule } from "@angular/router"
import { CommonModule } from "@angular/common";
import { bedOutline } from 'ionicons/icons';
import { happyOutline } from "ionicons/icons";
import { calendarOutline } from "ionicons/icons";
import { settingsOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { StorageService } from "../storage.service";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule],
})
export class HomePage {
  bedtimeData: any [] = [];
  daytimeSleepinessData: any [] = [];
  constructor(public sleepService:SleepService) {
    addIcons({ bedOutline, happyOutline, calendarOutline, settingsOutline });
	}

	ngOnInit() {}
}
