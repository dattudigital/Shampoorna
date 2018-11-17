import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
@Component({
  selector: 'app-vehicle-model',
  templateUrl: './vehicle-model.component.html',
  styleUrls: ['./vehicle-model.component.css']
})
export class VehicleModelComponent implements OnInit {
  modelData: any = [];
  cols: any = [];

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_model_id', header: 'Model Id' },
      { field: 'model_name', header: 'Model Name' }
    ];
    this.http.get(environment.host + 'vehicle-models').subscribe(data => {
      console.log(data.json())
      this.modelData = data.json().result;
    });
  }
  backToSetup() {
    this.router.navigate(['vehicle-setup'])
  }
}
