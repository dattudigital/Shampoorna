import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData'); 
    sessionStorage.removeItem('secondaryLoginData1');   
    sessionStorage.removeItem('backBtnInventory');
    sessionStorage.removeItem('backBtnManager'); 

  }

}
