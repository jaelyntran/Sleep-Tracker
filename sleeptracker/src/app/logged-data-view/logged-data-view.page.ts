import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from "@ionic/angular"
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logged-data-view',
  templateUrl: './logged-data-view.page.html',
  styleUrls: ['./logged-data-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class LoggedDataViewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
