import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData');  
    sessionStorage.removeItem('secondaryLoginData1'); 
    sessionStorage.removeItem('secondaryLoginData2');
    sessionStorage.removeItem('secondaryLoginData3');  
    // sessionStorage.removeItem('backBtnReports');  
    // sessionStorage.removeItem('backBtnInventory');
    // sessionStorage.removeItem('backBtnManager'); 
  }

}
