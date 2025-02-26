import { Component, Input, OnInit } from '@angular/core';
import { ModalController, IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-sleep-details',
  templateUrl: './sleep-details.component.html',
  styleUrls: ['./sleep-details.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class SleepDetailsComponent implements OnInit {
  @Input() sleepStart!: string;
  @Input() sleepEnd!: string;
  @Input() sleepDuration!: string;
  @Input() sleepDate!: string;

  formattedSleepStart: Date = new Date();
  formattedSleepEnd: Date = new Date();


  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.formattedSleepStart = new Date(this.sleepStart);
    this.formattedSleepEnd = new Date(this.sleepEnd);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

