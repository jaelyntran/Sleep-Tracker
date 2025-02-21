import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular"

@Component({
  selector: 'app-logged-data-view',
  templateUrl: './logged-data-view.page.html',
  styleUrls: ['./logged-data-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoggedDataViewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
