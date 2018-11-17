import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
@Component({
  selector: 'app-vehicle-color',
  templateUrl: './vehicle-color.component.html',
  styleUrls: ['./vehicle-color.component.css']
})
export class VehicleColorComponent implements OnInit {
  colorData:any=[];
  cols:any=[];

  constructor(private router:Router,private http:Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_color_id', header: 'Color Id' },
      { field: 'color_name', header: 'Color Name' }
    ];
    
    this.http.get(environment.host + 'vehicle-colors').subscribe(data => {
      console.log(data.json())
      this.colorData = data.json().result;
    });
  }
  backToSetup(){
    this.router.navigate(['vehicle-setup'])
  }
}
