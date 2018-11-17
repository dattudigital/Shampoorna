import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
declare var $: any;
@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {
  typeData: any = [];
  cols: any = [];
  typeName: '';
  editTypeData: any = []
  temp: any;
  type_name: '';
  vehicle_type_id: '';
  temp1: any
  typeDeleteData: any = [];

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
    this.cols = [
      { field: 'vehicle_type_id', header: 'Id' },
      { field: 'type_name', header: ' Name' }
    ];
    this.http.get(environment.host + 'vehicle-types').subscribe(data => {
      console.log(data.json())
      this.typeData = data.json().result;
    });
  }
  backToSetup() {
    this.router.navigate(['vehicle-setup'])
  }
  addType() {
    var data = {
      type_name: this.typeName,
      status: 1
    }
    console.log(data);
    this.http.post(environment.host + 'vehicle-types', data).subscribe(res => {
      console.log(res.json());
      this.typeData.push(res.json().result);
      console.log(this.typeData);
      $('#addType').modal('hide');
    })
  }
  removeFields() {
    this.type_name = '';
  }
  editType(data, index) {
    console.log('**********')
    console.log(data)
    this.editTypeData = data;
    data.index = index;
    this.temp = index;
    console.log(this.editTypeData[index].type_name);
    this.vehicle_type_id = this.editTypeData[index].vehicle_type_id;
    this.type_name = this.editTypeData[index].type_name;
  }

  updateType() {
    var data = {
      vehicle_type_id: this.vehicle_type_id,
      type_name: this.type_name,
      status: 1
    }
    console.log(data);
    this.http.post(environment.host + 'vehicle-types', data).subscribe(res => {
      console.log(res.json());
      this.editTypeData[this.temp].type_name = data.type_name;
      this.temp = " ";
    })
    this.removeFields();
    $('#editVehicleType').modal('hide')

  }
  deleteVehicleType(val, index) {
    this.temp1 = index;
    console.log(index)
    this.typeDeleteData = val;
    console.log(this.typeDeleteData)
    val.index = index;
    console.log("***")
    this.vehicle_type_id = this.typeDeleteData[index].vehicle_type_id;
    console.log(this.vehicle_type_id)
  }
  yesVehicleType() {
    this.typeData.splice(this.temp1, 1)
    console.log(this.temp1)
    var data = {
      vehicle_type_id: this.vehicle_type_id,
      status: "0"
    }
    console.log(data)
    this.http.post(environment.host + 'vehicle-types', data).subscribe(res => {
      console.log(res.json());
    })
  }

}
