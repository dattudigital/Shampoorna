import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {

  constructor( private http: Http) { }

  typeData: any[];
  makeData: any[];
  modelData: any[];
  colorData: any[];

  ngOnInit() {
    sessionStorage.removeItem('secondaryLoginData'); 
    sessionStorage.removeItem('secondaryLoginData1'); 
    sessionStorage.removeItem('secondaryLoginData2'); 
    sessionStorage.removeItem('backBtnReports');   
    sessionStorage.removeItem('backBtnInventory');
    sessionStorage.removeItem('backBtnManager'); 

    this.http.get(environment.host + 'vehicle-models').subscribe(data => {
      console.log(data.json())
      this.modelData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-colors').subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });

    this.http.get(environment.host + 'vehicle-types').subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });

  }

}
