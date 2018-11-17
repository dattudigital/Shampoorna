import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
@Component({
  selector: 'app-vehicle-made',
  templateUrl: './vehicle-made.component.html',
  styleUrls: ['./vehicle-made.component.css']
})
export class VehicleMadeComponent implements OnInit {
  
  madeData:any=[];
  cols:any=[];
  constructor(private router:Router,private http:Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_make_id', header: ' Id' },
      { field: 'make_name', header: ' Name' }
    ];

    this.http.get(environment.host + 'vehicle-makes').subscribe(data => {
      console.log(data.json())
      this.madeData = data.json().result;
      console.log(this.madeData);
    });
  }
  backToSetup(){
    this.router.navigate(['vehicle-setup'])
  }
}
