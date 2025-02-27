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


  constructor(private modalController: ModalController) { }

  ngOnInit() { }

  dismiss() {
    this.modalController.dismiss();
  }
}

