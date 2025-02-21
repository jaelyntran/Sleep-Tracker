import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { IonicModule } from "@ionic/angular"
import { RouterModule } from "@angular/router"
import { bedOutline } from 'ionicons/icons';
import { happyOutline } from "ionicons/icons";
import { calendarOutline } from "ionicons/icons";
import { settingsOutline } from "ionicons/icons";
import { addIcons } from "ionicons";
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, RouterModule],
})
export class HomePage {
  constructor(public sleepService:SleepService) {
    addIcons({ bedOutline, happyOutline, calendarOutline, settingsOutline });
	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}
}
