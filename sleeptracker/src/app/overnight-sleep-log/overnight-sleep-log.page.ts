import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular"

@Component({
  selector: 'app-overnight-sleep-log',
  templateUrl: './overnight-sleep-log.page.html',
  styleUrls: ['./overnight-sleep-log.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OvernightSleepLogPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
