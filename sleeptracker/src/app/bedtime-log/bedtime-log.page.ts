import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-bedtime-log',
  templateUrl: './bedtime-log.page.html',
  styleUrls: ['./bedtime-log.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BedtimeLogPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
