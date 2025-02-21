import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular"
import { RouterModule} from "@angular/router";

@Component({
  selector: 'app-daytime-sleepiness-log',
  templateUrl: './daytime-sleepiness-log.page.html',
  styleUrls: ['./daytime-sleepiness-log.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class DaytimeSleepinessLogPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
