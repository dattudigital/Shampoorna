import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData');  
    sessionStorage.removeItem('backBtnInventory');
    sessionStorage.removeItem('backBtnManager'); 

  }

}
