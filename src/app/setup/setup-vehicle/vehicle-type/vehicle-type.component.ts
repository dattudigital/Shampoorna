import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {Http} from '@angular/http'
@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {
  typeData:any=[];
  cols:any=[];

  constructor(private router:Router,private http:Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_type_id', header: 'Type Id' },
      { field: 'type_name', header: 'Type Name' }
    ];
    this.http.get(environment.host + 'vehicle-types').subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });
  }
  backToSetup(){
    this.router.navigate(['vehicle-setup'])
  }
}
